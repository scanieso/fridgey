/* global d3 */

import Ember from 'ember';

export default Ember.View.extend({
  classNames: ['fridge-chart'],

  addWedges: function () {
    var total = 0,
    items;

    items = this.get('controller.items').filter(function (item) {
      return item.get('status') !== undefined;
    });

    if (!items.length) {
      return false;
    }

    this.get('svg').selectAll('.slice').remove();

    var scale = d3.scale.linear()
    .domain([0, items.length])
    .range([0, 2 * Math.PI]);

    var arc = d3.svg.arc()
    .innerRadius(0)
    .outerRadius(this.get('radius'))
    .startAngle(function () {
      return scale(total);
    })
    .endAngle(function () {
      total += 1;
      return scale(total);
    });

    var slices = this.get('svg').selectAll('g')
    .data(items.sortBy('status'))
    .enter()
    .append('g')
    .attr('class', function (d) {
      return d.get('statusClassName');
    })
    .classed('slice', true);

    slices.append('path')
    .attr('d', arc);
  }.observes('controller.items.@each.status'),

  didInsertElement: function () {
    var height = 300,
    shadow = {
      x: 6,
      y: 6
    },
    canvas = {
      height: height + shadow.y,
      width: height + shadow.x
    },
    radius = height/2;

    var svg = d3.select(this.$()[0]).append('svg')
    .attr('viewBox', '0 0 ' + canvas.width + ' ' + canvas.height)
    .classed('chart-pie', true)
    .append('g')
    .classed('pie', true)
    .attr('transform', 'translate(' + [radius, radius] + ')');

    svg.append('circle')
    .classed('shadow', true)
    .attr('cx', shadow.x)
    .attr('cy', shadow.y)
    .attr('r', radius);

    svg.append('circle')
    .classed('background', true)
    .attr('r', radius - 1);

    this.set('svg', svg);
    this.set('radius', radius);
    Ember.run.once(this, 'addWedges');
  }
});
