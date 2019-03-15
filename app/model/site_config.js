module.exports = app => {
    const { STRING, TEXT, INTEGER } = app.Sequelize;
    const SiteConfig = app.model.define('site_config', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        key: STRING,
        value: TEXT,
        desc: STRING,
    }, {
        freezeTableName: true,
    });

    SiteConfig.findByKey = async function(key) {
        return await this.findOne({
            where: {
                key,
            },
        });
    };

    return SiteConfig;
};
