((groupsService) => {
    groupsService.init = (app) => {
        const groupsModule = require('../../modules/groups-module');

        app.get('/groups', (req, res) => {
            let groups = groupsModule.getInistalGroups();

            for (let g in groups) {
                delete groups[g].slots;
            }

            res.status(200).send(groups);
        });

        app.get('/group/:id', (req, res) => {
            let groups = groupsModule.getInistalGroups();

            const groupId = req.params.id;

            if (groups[groupId]) {
                let groupToSend = groups[groupId];
                
                res.status(200).send(groupToSend);
            } else {
                res.status(400).send({type:"group-not-found", description: "Group not found"});
            }

            res.status(200).send(groups);
        });
    };
})(module.exports);