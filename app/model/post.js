const moment = require('moment');
const uuidv1 = require('uuid/v1');
module.exports = app => {
    const { STRING, INTEGER, DATE, TEXT, BOOLEAN, Op  } = app.Sequelize;
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
        pathname: STRING,
        markdown_content: {
            type: TEXT,
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
                // if (this.type === 0) {
                return `/${this.created_year}/${this.created_month}/${this.pathname}.html`;
                // }
                // return this.pathname;
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

    Post.createEmpty = async function(userId) {
        const uuid = uuidv1().replace(/[-]/g, '');
        const now = (new Date());
        return await this.create({
            uuid,
            user_id: userId,
            title: '无标题',
            created_year: now.getFullYear(),
            created_month: now.getMonth() + 1,
            pathname: uuid,
            summary: '',
            markdown_content: '',
            content: '',
        });
    }

    Post.findByPathname = async function(year, month, pathname) {
        return await this.findOne({
            where: {
                pathname,
                created_year: year,
                created_month: month,
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
                // 0 -> 文章、1 -> 页面
                type: 0,
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
