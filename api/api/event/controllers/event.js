'use strict';
const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async future(_ctx) {
        const entities = await strapi.query('event').find({ date_gt: new Date().toISOString(), _sort: 'date:desc' })
        return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.event }));
    },
};
