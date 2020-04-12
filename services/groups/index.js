((groupsService) => {
    groupsService.init = (app) => {
        const groupsModule = require('../../modules/groups-module');
        const authModule = require('./../../modules/auth-module');

        app.get('/groups', (req, res) => {
            let groups = groupsModule.getInitialGroups();

            for (let g in groups) {
                delete groups[g].slots;
            }

            res.status(200).send(groups);
        });

        app.get('/group/counts', authModule.isLoggedIn, async (req, res) => {
            const groupId = req.currentUser.groupId;

            const group = await groupsModule.getGroupWithSlotCount(groupId);

            res.status(200).send(group);
        });
    };
})(module.exports);