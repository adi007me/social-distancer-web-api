((slotsHelper) => {
    slotsHelper.getInitialSlots = () => {
        let slots = {};

        for (i = 0; i < 24; i++) {
            slots[i] = [];
        }

        return slots;
    }
})(module.exports);
