const moment = require('moment');
const uuidv1 = require('uuid/v1');
const marked = require('marked');
const utils = require('utility');

module.exports = app => {
    const { STRING, INTEGER, DATE, TEXT, Op  } = app.Sequelize;
    const Post = app.model.define('post', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        uuid: STRING,
        title: {
            type: STRING(30),
            set(value) {
                if (!value) {
                    value = '无标题';
                }
                return this.setDataValue('title', value);
            }
        },
        slug: STRING,
        markdown_content: {
            type: TEXT,
            set(val) {
                function escape(html, encode) {
                    if (encode) {
                      if (escape.escapeTest.test(html)) {
                        return html.replace(escape.escapeReplace, function(ch) { return escape.replacements[ch]; });
                      }
                    } else {
                      if (escape.escapeTestNoEncode.test(html)) {
                        return html.replace(escape.escapeReplaceNoEncode, function(ch) { return escape.replacements[ch]; });
                      }
                    }
                  
                    return html;
                }
                
                escape.escapeTest = /[&<>"']/;
                escape.escapeReplace = /[&<>"']/g;
                escape.replacements = {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#39;'
                };
                
                escape.escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
                escape.escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
                const renderer = new marked.Renderer();
                renderer.heading = function (text, level) {
                    const anchor = utils.md5(level + '').slice(0, 8);
                    return `
                            <h${level} id="${anchor}">
                              <a class="anchor" href="#${anchor}"></a>
                              ${text}
                            </h${level}>`;
                };
                renderer.code = function(code, infostring, escaped) {
                    var lang = (infostring || '').match(/\S*/)[0];
                    if (this.options.highlight) {
                        var out = this.options.highlight(code, lang);
                        if (out != null && out !== code) {
                            escaped = true;
                            code = out;
                        }
                    }
                    const codeClass = !lang ? '' : this.options.langPrefix + escape(lang, true);
                    const codeHTML = (escaped ? code : escape(code, true));
                    var lang = (infostring || '').match(/\S*/)[0];
                    if (this.options.highlight) {
                        var out = this.options.highlight(code, lang);
                        if (out != null && out !== code) {
                            escaped = true;
                            code = out;
                        }
                    }

                    if (!lang) {
                        return '<pre><code>'
                        + (escaped ? code : escape(code, true))
                        + '</code></pre>';
                    }

                    return '<pre><code class="'
                        + this.options.langPrefix
                        + escape(lang, true)
                        + '">'
                        + (escaped ? code : escape(code, true))
                        + '</code></pre>\n';
                }
                const result = marked(val, {
                    renderer,
                });
                this.setDataValue('content', result);
                this.setDataValue('markdown_content', val);
            },
        },
        summary: TEXT,
        content: TEXT,
        type: INTEGER,
        status: INTEGER,
        created_year: INTEGER,
        created_month: {
            type: INTEGER,
            set(month) {
                if (month < 10) {
                    return this.setDataValue('created_month', `0${month}`);
                }
                return this.setDataValue('created_month', month);
            },
        },
        view_num: INTEGER,
        created_at: DATE,
        updated_at: DATE,
    }, {
        getterMethods: {
            url() {
                if (this.type === 1) {
                    return `/page/${this.slug}.html`;
                }
                return `/${this.created_year}/${this.created_month}/${this.slug}.html`;
            },
            created_at_short() {
                return moment(this.created_at).format('YYYY-MM-DD');
            },
            updated_at_short() {
                return moment(this.updated_at).format('YYYY-MM-DD');
            },
        },
        freezeTableName: true,
    });

    Post.findPrevAndNext = async function(id, date) {
        const whereCondition = {
            id: {
                [Op.ne]: id,
            },
            // 0 为草稿，1 为已经发布
            status: 1,
        };
        const order = [
            [ 'created_at', 'DESC' ],
        ];
        const prev = await this.findOne({
            where: Object.assign({}, whereCondition, {
                created_at: {
                    [Op.lt]: date, 
                },
            }),
            order,
        });
        const next = await this.findOne({
            where: Object.assign({}, whereCondition, {
                created_at: {
                    [Op.gt]: date, 
                },
            }),
            order,
        });
        return {
            prev,
            next,
        };
    }

    // 创建一个空的
    Post.createEmpty = async function(userId) {
        const uuid = uuidv1().replace(/[-]/g, '');
        const now = (new Date());
        return await this.create({
            uuid,
            user_id: userId,
            title: '无标题',
            created_year: now.getFullYear(),
            created_month: now.getMonth() + 1,
            slug: uuid,
            summary: '',
            markdown_content: '',
            content: '',
        });
    }

    Post.findByYearMonthAndSlug = async function(year, month, slug) {
        return await this.findOne({
            where: {
                slug,
                created_year: year,
                created_month: month,
            },
        });
    };

    Post.findBySlug = async function(slug) {
        return await this.findOne({
            where: {
                slug,
                // 0 为草稿，1 为已经发布
                status: 1,
            },
        });
    };

    Post.findByUserIdAndUUID = async function(userId, uuid) {
        return await this.findOne({
            where: {
                uuid,
                user_id: userId,
                status: {
                    [Op.gt]: -1,
                }
            },
        });
    };

    Post.findAndCountAllForFront = async function(pageIndex = 1, pageSize = 10) {
        const offset = (pageIndex - 1) >= 0 ? (pageIndex - 1) * pageSize : 0;
        return await this.findAndCountAll({
            where: {
                // 0 为草稿，1 为已经发布
                status: 1,
            },
            order: [
                [ 'created_at', 'DESC' ],
            ],
            limit: pageSize,
            offset,
        });
    };

    Post.findAndCountAllForAPI = async function(condition) {
        const pageIndex = condition.pageIndex || 1;
        const pageSize = condition.pageSize || 10;
        const offset = (pageIndex - 1) >= 0 ? (pageIndex - 1) * pageSize : 0;
        return await this.findAndCountAll({
            where: {
                status: {
                    [Op.gt]: -1,
                }
            },
            order: [
                [ 'updated_at', 'DESC' ],
            ],
            limit: pageSize,
            offset,
        });
    };

    Post.findHotList = async function(number = 5) {
        return await this.findAll({
            where: {
                // 0 为草稿，1 为已经发布
                status: 1,
            },
            order: [
                [ 'view_num', 'DESC' ],
            ],
            limit: number,
        });
    };

    Post.destroy = async function(loginUserId, uuid) {
        const info = await this.findOne({
            where: {
                uuid,
                user_id: loginUserId,
                status: {
                    [Op.gt]: -1,
                }
            }
        });
        if (!info) {
            return false;
        }
        info.status = -1;
        info.save();
        return true;
    }

    return Post;
};
