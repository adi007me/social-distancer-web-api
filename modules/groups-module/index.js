((groupsModule) => {   
    const slotsHelper = require('./slotsHelper'); 
    const groupData = require('../../data').groups;

    const slots = slotsHelper.getInitialSlots();
    
    let groups = {};
    const startX = 18.64;
    const startY = 73.72;
    const endX = 18.6625;
    const endY = 73.76;
    const stepX = 0.0025;
    const stepY = 0.0025;

    const xSteps = Math.ceil(Math.abs(startX - endX)/stepX);
    const ySteps = Math.ceil(Math.abs(startY - endY)/stepY);

    for (x = 0; x < xSteps; x++) {
        for (y = 0; y < ySteps; y++) {
            const lowerBound = {
                x: startX + stepX * x,
                y: startY + stepY * y
            };
            
            const upperBound = {
                x: startX + stepX * (x + 1),
                y: startY + stepY * (y + 1)
            };
            
            const group = {
                id: 'G' + x + '' + y,
                lowerBound,
                upperBound,
                slots
            };
            
            groups['G(' + x + ',' + y + ')'] = group;
        }
    }

    function getInitialGroups() {
        return groups;
    }

    function findGroupId(coords) {
        const diffX = (coords.x - startX);
        const diffY = (coords.y - startY);

        const group = 'G(' + Math.floor(diffX/stepX) + ',' + Math.floor(diffY/stepY) + ')';

        if (groups[group]) {
            return group;
        } else {
            throw {type:"location-not-supported", description: "Location not supported yet"}
        }
    }

    async function getGroupWithSlotCount(groupId) {
        const group = await groupData.getGroup(groupId);
        
        const slots = group.slots.map(s => s.length);

        return {
            id: group.id,
            slots: slots
        };
    }

    groupsModule.getInitialGroups = getInitialGroups;
    groupsModule.findGroupId = findGroupId;
    groupsModule.getGroupWithSlotCount = getGroupWithSlotCount;

})(module.exports);