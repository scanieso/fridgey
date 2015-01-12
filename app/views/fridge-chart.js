/* global d3 */

import Ember from 'ember';

export default Ember.View.extend({
  classNames: ['fridge-chart'],

  items: Ember.computed.alias('controller.items'),

  addWedges: function () {
    var self = this,
    total = 0,
    groups = [],
    items = this.get('items').filterBy('isInFridge', false);

    groups.push({
      label: 'Eaten',
      items: items.filterBy('status', 'eaten')
    });

    groups.push({
      label: 'Thrown Out',
      items: items.filterBy('status', 'thrownOut')
    });

    if (!groups.length) {
      return false;
    }

    this.get('svg').selectAll('.slice').remove();

    var scale = d3.scale.linear()
    .domain([0, items.get('length')])
    .range([0, 2 * Math.PI]);

    var arc = d3.svg.arc()
    .innerRadius(0)
    .outerRadius(this.get('radius'))
    .startAngle(function () {
      return scale(total);
    })
    .endAngle(function (d) {
      total += d.items.length;
      return scale(total);
    });

    var slices = this.get('svg').selectAll('g')
    .data(groups)
    .enter()
    .append('g')
    .attr('class', function (d) {
      if (d.items.length) {
        return d.items[0].get('statusClassName');
      }
    })
    .classed('slice', true);

    slices.append('path')
    .attr('d', arc);

    slices.append('svg:text')
    .attr('transform', function (d) {
      d.innerRadius = 0;
      d.outerRadius = self.get('radius');
      return 'translate(' + arc.centroid(d) + ')';
    })
    .text(function (d, i) {
      return groups[i].label;
    });
  }.observes('controller.items.@each.status'),

  didInsertElement: function () {
    var height = 200,
    shadow = {
      x: 4,
      y: 4
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
