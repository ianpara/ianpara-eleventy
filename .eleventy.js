module.exports = config => {

    // Set directories to pass through to the dist folder
    config.addPassthroughCopy('./src/resume/');
    config.addPassthroughCopy('./src/js/');
    config.addPassthroughCopy({
        './node_modules/bootstrap/dist/js/bootstrap.min.js': '/js/bootstrap.min.js'
    });
    config.addPassthroughCopy({
        './node_modules/simple-line-icons/fonts/*': '/fonts/'
    });

    // Transforms
    const htmlMinTransform = require('./src/transforms/html-min-transform.js');

    // Create a helpful production flag
    const isProduction = process.env.NODE_ENV === 'production';

    // Only minify HTML if we are in production because it slows builds _right_ down
    if (isProduction) {
        config.addTransform('htmlmin', htmlMinTransform);
    }

    // Returns work items, sorted by display order
    config.addCollection('work', collection => {
        return collection
        .getFilteredByGlob('./src/work/*.md')
        .sort((a, b) => (Number(a.data.displayOrder) > Number(b.data.displayOrder) ? 1 : -1));
    });

    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',

        dir: {
            input: 'src',
            output: 'dist'
        }
    };
};
