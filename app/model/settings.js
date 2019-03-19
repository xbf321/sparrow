module.exports = app => {
    const { STRING, TEXT, INTEGER } = app.Sequelize;
    const Settings = app.model.define('settings', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        key: STRING,
        value: TEXT,
    }, {
        freezeTableName: true,
    });

    Settings.findByKey = async function(key) {
        return await this.findOne({
            where: {
                key,
            },
        });
    };

    return Settings;
};
