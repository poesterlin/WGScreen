'use strict';
const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async future(_ctx) {
        const d = new Date();
        d.setDate(d.getDate() - 1)
        const entities = await strapi.query('event').find({ date_gt: d.toISOString(), _sort: 'date:asc' })
        return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.event }));
    },
};
