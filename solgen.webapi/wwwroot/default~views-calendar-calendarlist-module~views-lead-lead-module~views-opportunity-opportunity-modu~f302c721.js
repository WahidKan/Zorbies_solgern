(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~views-calendar-calendarlist-module~views-lead-lead-module~views-opportunity-opportunity-modu~f302c721"],{

/***/ "./node_modules/@fullcalendar/daygrid/main.esm.js":
/*!********************************************************!*\
  !*** ./node_modules/@fullcalendar/daygrid/main.esm.js ***!
  \********************************************************/
/*! exports provided: default, AbstractDayGridView, DayBgRow, DayGrid, DayGridSlicer, DayGridView, SimpleDayGrid, buildBasicDayTable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractDayGridView", function() { return AbstractDayGridView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DayBgRow", function() { return DayBgRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DayGrid", function() { return DayGrid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DayGridSlicer", function() { return DayGridSlicer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DayGridView", function() { return DayGridView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimpleDayGrid", function() { return SimpleDayGrid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildBasicDayTable", function() { return buildDayTable; });
/* harmony import */ var _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fullcalendar/core */ "./node_modules/@fullcalendar/core/main.esm.js");
/*!
FullCalendar Day Grid Plugin v4.4.2
Docs & License: https://fullcalendar.io/
(c) 2019 Adam Shaw
*/



/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var DayGridDateProfileGenerator = /** @class */ (function (_super) {
    __extends(DayGridDateProfileGenerator, _super);
    function DayGridDateProfileGenerator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Computes the date range that will be rendered.
    DayGridDateProfileGenerator.prototype.buildRenderRange = function (currentRange, currentRangeUnit, isRangeAllDay) {
        var dateEnv = this.dateEnv;
        var renderRange = _super.prototype.buildRenderRange.call(this, currentRange, currentRangeUnit, isRangeAllDay);
        var start = renderRange.start;
        var end = renderRange.end;
        var endOfWeek;
        // year and month views should be aligned with weeks. this is already done for week
        if (/^(year|month)$/.test(currentRangeUnit)) {
            start = dateEnv.startOfWeek(start);
            // make end-of-week if not already
            endOfWeek = dateEnv.startOfWeek(end);
            if (endOfWeek.valueOf() !== end.valueOf()) {
                end = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["addWeeks"])(endOfWeek, 1);
            }
        }
        // ensure 6 weeks
        if (this.options.monthMode &&
            this.options.fixedWeekCount) {
            var rowCnt = Math.ceil(// could be partial weeks due to hiddenDays
            Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["diffWeeks"])(start, end));
            end = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["addWeeks"])(end, 6 - rowCnt);
        }
        return { start: start, end: end };
    };
    return DayGridDateProfileGenerator;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["DateProfileGenerator"]));

/* A rectangular panel that is absolutely positioned over other content
------------------------------------------------------------------------------------------------------------------------
Options:
  - className (string)
  - content (HTML string, element, or element array)
  - parentEl
  - top
  - left
  - right (the x coord of where the right edge should be. not a "CSS" right)
  - autoHide (boolean)
  - show (callback)
  - hide (callback)
*/
var Popover = /** @class */ (function () {
    function Popover(options) {
        var _this = this;
        this.isHidden = true;
        this.margin = 10; // the space required between the popover and the edges of the scroll container
        // Triggered when the user clicks *anywhere* in the document, for the autoHide feature
        this.documentMousedown = function (ev) {
            // only hide the popover if the click happened outside the popover
            if (_this.el && !_this.el.contains(ev.target)) {
                _this.hide();
            }
        };
        this.options = options;
    }
    // Shows the popover on the specified position. Renders it if not already
    Popover.prototype.show = function () {
        if (this.isHidden) {
            if (!this.el) {
                this.render();
            }
            this.el.style.display = '';
            this.position();
            this.isHidden = false;
            this.trigger('show');
        }
    };
    // Hides the popover, through CSS, but does not remove it from the DOM
    Popover.prototype.hide = function () {
        if (!this.isHidden) {
            this.el.style.display = 'none';
            this.isHidden = true;
            this.trigger('hide');
        }
    };
    // Creates `this.el` and renders content inside of it
    Popover.prototype.render = function () {
        var _this = this;
        var options = this.options;
        var el = this.el = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createElement"])('div', {
            className: 'fc-popover ' + (options.className || ''),
            style: {
                top: '0',
                left: '0'
            }
        });
        if (typeof options.content === 'function') {
            options.content(el);
        }
        options.parentEl.appendChild(el);
        // when a click happens on anything inside with a 'fc-close' className, hide the popover
        Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["listenBySelector"])(el, 'click', '.fc-close', function (ev) {
            _this.hide();
        });
        if (options.autoHide) {
            document.addEventListener('mousedown', this.documentMousedown);
        }
    };
    // Hides and unregisters any handlers
    Popover.prototype.destroy = function () {
        this.hide();
        if (this.el) {
            Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["removeElement"])(this.el);
            this.el = null;
        }
        document.removeEventListener('mousedown', this.documentMousedown);
    };
    // Positions the popover optimally, using the top/left/right options
    Popover.prototype.position = function () {
        var options = this.options;
        var el = this.el;
        var elDims = el.getBoundingClientRect(); // only used for width,height
        var origin = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["computeRect"])(el.offsetParent);
        var clippingRect = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["computeClippingRect"])(options.parentEl);
        var top; // the "position" (not "offset") values for the popover
        var left; //
        // compute top and left
        top = options.top || 0;
        if (options.left !== undefined) {
            left = options.left;
        }
        else if (options.right !== undefined) {
            left = options.right - elDims.width; // derive the left value from the right value
        }
        else {
            left = 0;
        }
        // constrain to the view port. if constrained by two edges, give precedence to top/left
        top = Math.min(top, clippingRect.bottom - elDims.height - this.margin);
        top = Math.max(top, clippingRect.top + this.margin);
        left = Math.min(left, clippingRect.right - elDims.width - this.margin);
        left = Math.max(left, clippingRect.left + this.margin);
        Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["applyStyle"])(el, {
            top: top - origin.top,
            left: left - origin.left
        });
    };
    // Triggers a callback. Calls a function in the option hash of the same name.
    // Arguments beyond the first `name` are forwarded on.
    // TODO: better code reuse for this. Repeat code
    // can kill this???
    Popover.prototype.trigger = function (name) {
        if (this.options[name]) {
            this.options[name].apply(this, Array.prototype.slice.call(arguments, 1));
        }
    };
    return Popover;
}());

/* Event-rendering methods for the DayGrid class
----------------------------------------------------------------------------------------------------------------------*/
// "Simple" is bad a name. has nothing to do with SimpleDayGrid
var SimpleDayGridEventRenderer = /** @class */ (function (_super) {
    __extends(SimpleDayGridEventRenderer, _super);
    function SimpleDayGridEventRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Builds the HTML to be used for the default element for an individual segment
    SimpleDayGridEventRenderer.prototype.renderSegHtml = function (seg, mirrorInfo) {
        var context = this.context;
        var eventRange = seg.eventRange;
        var eventDef = eventRange.def;
        var eventUi = eventRange.ui;
        var allDay = eventDef.allDay;
        var isDraggable = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["computeEventDraggable"])(context, eventDef, eventUi);
        var isResizableFromStart = allDay && seg.isStart && Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["computeEventStartResizable"])(context, eventDef, eventUi);
        var isResizableFromEnd = allDay && seg.isEnd && Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["computeEventEndResizable"])(context, eventDef, eventUi);
        var classes = this.getSegClasses(seg, isDraggable, isResizableFromStart || isResizableFromEnd, mirrorInfo);
        var skinCss = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["cssToStr"])(this.getSkinCss(eventUi));
        var timeHtml = '';
        var timeText;
        var titleHtml;
        classes.unshift('fc-day-grid-event', 'fc-h-event');
        // Only display a timed events time if it is the starting segment
        if (seg.isStart) {
            timeText = this.getTimeText(eventRange);
            if (timeText) {
                timeHtml = '<span class="fc-time">' + Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["htmlEscape"])(timeText) + '</span>';
            }
        }
        titleHtml =
            '<span class="fc-title">' +
                (Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["htmlEscape"])(eventDef.title || '') || '&nbsp;') + // we always want one line of height
                '</span>';
        return '<a class="' + classes.join(' ') + '"' +
            (eventDef.url ?
                ' href="' + Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["htmlEscape"])(eventDef.url) + '"' :
                '') +
            (skinCss ?
                ' style="' + skinCss + '"' :
                '') +
            '>' +
            '<div class="fc-content">' +
            (context.options.dir === 'rtl' ?
                titleHtml + ' ' + timeHtml : // put a natural space in between
                timeHtml + ' ' + titleHtml //
            ) +
            '</div>' +
            (isResizableFromStart ?
                '<div class="fc-resizer fc-start-resizer"></div>' :
                '') +
            (isResizableFromEnd ?
                '<div class="fc-resizer fc-end-resizer"></div>' :
                '') +
            '</a>';
    };
    // Computes a default event time formatting string if `eventTimeFormat` is not explicitly defined
    SimpleDayGridEventRenderer.prototype.computeEventTimeFormat = function () {
        return {
            hour: 'numeric',
            minute: '2-digit',
            omitZeroMinute: true,
            meridiem: 'narrow'
        };
    };
    SimpleDayGridEventRenderer.prototype.computeDisplayEventEnd = function () {
        return false; // TODO: somehow consider the originating DayGrid's column count
    };
    return SimpleDayGridEventRenderer;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["FgEventRenderer"]));

/* Event-rendering methods for the DayGrid class
----------------------------------------------------------------------------------------------------------------------*/
var DayGridEventRenderer = /** @class */ (function (_super) {
    __extends(DayGridEventRenderer, _super);
    function DayGridEventRenderer(dayGrid) {
        var _this = _super.call(this) || this;
        _this.dayGrid = dayGrid;
        return _this;
    }
    // Renders the given foreground event segments onto the grid
    DayGridEventRenderer.prototype.attachSegs = function (segs, mirrorInfo) {
        var rowStructs = this.rowStructs = this.renderSegRows(segs);
        // append to each row's content skeleton
        this.dayGrid.rowEls.forEach(function (rowNode, i) {
            rowNode.querySelector('.fc-content-skeleton > table').appendChild(rowStructs[i].tbodyEl);
        });
        // removes the "more.." events popover
        if (!mirrorInfo) {
            this.dayGrid.removeSegPopover();
        }
    };
    // Unrenders all currently rendered foreground event segments
    DayGridEventRenderer.prototype.detachSegs = function () {
        var rowStructs = this.rowStructs || [];
        var rowStruct;
        while ((rowStruct = rowStructs.pop())) {
            Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["removeElement"])(rowStruct.tbodyEl);
        }
        this.rowStructs = null;
    };
    // Uses the given events array to generate <tbody> elements that should be appended to each row's content skeleton.
    // Returns an array of rowStruct objects (see the bottom of `renderSegRow`).
    // PRECONDITION: each segment shoud already have a rendered and assigned `.el`
    DayGridEventRenderer.prototype.renderSegRows = function (segs) {
        var rowStructs = [];
        var segRows;
        var row;
        segRows = this.groupSegRows(segs); // group into nested arrays
        // iterate each row of segment groupings
        for (row = 0; row < segRows.length; row++) {
            rowStructs.push(this.renderSegRow(row, segRows[row]));
        }
        return rowStructs;
    };
    // Given a row # and an array of segments all in the same row, render a <tbody> element, a skeleton that contains
    // the segments. Returns object with a bunch of internal data about how the render was calculated.
    // NOTE: modifies rowSegs
    DayGridEventRenderer.prototype.renderSegRow = function (row, rowSegs) {
        var isRtl = this.context.isRtl;
        var dayGrid = this.dayGrid;
        var colCnt = dayGrid.colCnt;
        var segLevels = this.buildSegLevels(rowSegs); // group into sub-arrays of levels
        var levelCnt = Math.max(1, segLevels.length); // ensure at least one level
        var tbody = document.createElement('tbody');
        var segMatrix = []; // lookup for which segments are rendered into which level+col cells
        var cellMatrix = []; // lookup for all <td> elements of the level+col matrix
        var loneCellMatrix = []; // lookup for <td> elements that only take up a single column
        var i;
        var levelSegs;
        var col;
        var tr;
        var j;
        var seg;
        var td;
        // populates empty cells from the current column (`col`) to `endCol`
        function emptyCellsUntil(endCol) {
            while (col < endCol) {
                // try to grab a cell from the level above and extend its rowspan. otherwise, create a fresh cell
                td = (loneCellMatrix[i - 1] || [])[col];
                if (td) {
                    td.rowSpan = (td.rowSpan || 1) + 1;
                }
                else {
                    td = document.createElement('td');
                    tr.appendChild(td);
                }
                cellMatrix[i][col] = td;
                loneCellMatrix[i][col] = td;
                col++;
            }
        }
        for (i = 0; i < levelCnt; i++) { // iterate through all levels
            levelSegs = segLevels[i];
            col = 0;
            tr = document.createElement('tr');
            segMatrix.push([]);
            cellMatrix.push([]);
            loneCellMatrix.push([]);
            // levelCnt might be 1 even though there are no actual levels. protect against this.
            // this single empty row is useful for styling.
            if (levelSegs) {
                for (j = 0; j < levelSegs.length; j++) { // iterate through segments in level
                    seg = levelSegs[j];
                    var leftCol = isRtl ? (colCnt - 1 - seg.lastCol) : seg.firstCol;
                    var rightCol = isRtl ? (colCnt - 1 - seg.firstCol) : seg.lastCol;
                    emptyCellsUntil(leftCol);
                    // create a container that occupies or more columns. append the event element.
                    td = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createElement"])('td', { className: 'fc-event-container' }, seg.el);
                    if (leftCol !== rightCol) {
                        td.colSpan = rightCol - leftCol + 1;
                    }
                    else { // a single-column segment
                        loneCellMatrix[i][col] = td;
                    }
                    while (col <= rightCol) {
                        cellMatrix[i][col] = td;
                        segMatrix[i][col] = seg;
                        col++;
                    }
                    tr.appendChild(td);
                }
            }
            emptyCellsUntil(colCnt); // finish off the row
            var introHtml = dayGrid.renderProps.renderIntroHtml();
            if (introHtml) {
                if (isRtl) {
                    Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["appendToElement"])(tr, introHtml);
                }
                else {
                    Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["prependToElement"])(tr, introHtml);
                }
            }
            tbody.appendChild(tr);
        }
        return {
            row: row,
            tbodyEl: tbody,
            cellMatrix: cellMatrix,
            segMatrix: segMatrix,
            segLevels: segLevels,
            segs: rowSegs
        };
    };
    // Stacks a flat array of segments, which are all assumed to be in the same row, into subarrays of vertical levels.
    // NOTE: modifies segs
    DayGridEventRenderer.prototype.buildSegLevels = function (segs) {
        var isRtl = this.context.isRtl;
        var colCnt = this.dayGrid.colCnt;
        var levels = [];
        var i;
        var seg;
        var j;
        // Give preference to elements with certain criteria, so they have
        // a chance to be closer to the top.
        segs = this.sortEventSegs(segs);
        for (i = 0; i < segs.length; i++) {
            seg = segs[i];
            // loop through levels, starting with the topmost, until the segment doesn't collide with other segments
            for (j = 0; j < levels.length; j++) {
                if (!isDaySegCollision(seg, levels[j])) {
                    break;
                }
            }
            // `j` now holds the desired subrow index
            seg.level = j;
            seg.leftCol = isRtl ? (colCnt - 1 - seg.lastCol) : seg.firstCol; // for sorting only
            seg.rightCol = isRtl ? (colCnt - 1 - seg.firstCol) : seg.lastCol // for sorting only
            ;
            (levels[j] || (levels[j] = [])).push(seg);
        }
        // order segments left-to-right. very important if calendar is RTL
        for (j = 0; j < levels.length; j++) {
            levels[j].sort(compareDaySegCols);
        }
        return levels;
    };
    // Given a flat array of segments, return an array of sub-arrays, grouped by each segment's row
    DayGridEventRenderer.prototype.groupSegRows = function (segs) {
        var segRows = [];
        var i;
        for (i = 0; i < this.dayGrid.rowCnt; i++) {
            segRows.push([]);
        }
        for (i = 0; i < segs.length; i++) {
            segRows[segs[i].row].push(segs[i]);
        }
        return segRows;
    };
    // Computes a default `displayEventEnd` value if one is not expliclty defined
    DayGridEventRenderer.prototype.computeDisplayEventEnd = function () {
        return this.dayGrid.colCnt === 1; // we'll likely have space if there's only one day
    };
    return DayGridEventRenderer;
}(SimpleDayGridEventRenderer));
// Computes whether two segments' columns collide. They are assumed to be in the same row.
function isDaySegCollision(seg, otherSegs) {
    var i;
    var otherSeg;
    for (i = 0; i < otherSegs.length; i++) {
        otherSeg = otherSegs[i];
        if (otherSeg.firstCol <= seg.lastCol &&
            otherSeg.lastCol >= seg.firstCol) {
            return true;
        }
    }
    return false;
}
// A cmp function for determining the leftmost event
function compareDaySegCols(a, b) {
    return a.leftCol - b.leftCol;
}

var DayGridMirrorRenderer = /** @class */ (function (_super) {
    __extends(DayGridMirrorRenderer, _super);
    function DayGridMirrorRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DayGridMirrorRenderer.prototype.attachSegs = function (segs, mirrorInfo) {
        var sourceSeg = mirrorInfo.sourceSeg;
        var rowStructs = this.rowStructs = this.renderSegRows(segs);
        // inject each new event skeleton into each associated row
        this.dayGrid.rowEls.forEach(function (rowNode, row) {
            var skeletonEl = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["htmlToElement"])('<div class="fc-mirror-skeleton"><table></table></div>'); // will be absolutely positioned
            var skeletonTopEl;
            var skeletonTop;
            // If there is an original segment, match the top position. Otherwise, put it at the row's top level
            if (sourceSeg && sourceSeg.row === row) {
                skeletonTopEl = sourceSeg.el;
            }
            else {
                skeletonTopEl = rowNode.querySelector('.fc-content-skeleton tbody');
                if (!skeletonTopEl) { // when no events
                    skeletonTopEl = rowNode.querySelector('.fc-content-skeleton table');
                }
            }
            skeletonTop = skeletonTopEl.getBoundingClientRect().top -
                rowNode.getBoundingClientRect().top; // the offsetParent origin
            skeletonEl.style.top = skeletonTop + 'px';
            skeletonEl.querySelector('table').appendChild(rowStructs[row].tbodyEl);
            rowNode.appendChild(skeletonEl);
        });
    };
    return DayGridMirrorRenderer;
}(DayGridEventRenderer));

var EMPTY_CELL_HTML = '<td style="pointer-events:none"></td>';
var DayGridFillRenderer = /** @class */ (function (_super) {
    __extends(DayGridFillRenderer, _super);
    function DayGridFillRenderer(dayGrid) {
        var _this = _super.call(this) || this;
        _this.fillSegTag = 'td'; // override the default tag name
        _this.dayGrid = dayGrid;
        return _this;
    }
    DayGridFillRenderer.prototype.renderSegs = function (type, context, segs) {
        // don't render timed background events
        if (type === 'bgEvent') {
            segs = segs.filter(function (seg) {
                return seg.eventRange.def.allDay;
            });
        }
        _super.prototype.renderSegs.call(this, type, context, segs);
    };
    DayGridFillRenderer.prototype.attachSegs = function (type, segs) {
        var els = [];
        var i;
        var seg;
        var skeletonEl;
        for (i = 0; i < segs.length; i++) {
            seg = segs[i];
            skeletonEl = this.renderFillRow(type, seg);
            this.dayGrid.rowEls[seg.row].appendChild(skeletonEl);
            els.push(skeletonEl);
        }
        return els;
    };
    // Generates the HTML needed for one row of a fill. Requires the seg's el to be rendered.
    DayGridFillRenderer.prototype.renderFillRow = function (type, seg) {
        var dayGrid = this.dayGrid;
        var isRtl = this.context.isRtl;
        var colCnt = dayGrid.colCnt;
        var leftCol = isRtl ? (colCnt - 1 - seg.lastCol) : seg.firstCol;
        var rightCol = isRtl ? (colCnt - 1 - seg.firstCol) : seg.lastCol;
        var startCol = leftCol;
        var endCol = rightCol + 1;
        var className;
        var skeletonEl;
        var trEl;
        if (type === 'businessHours') {
            className = 'bgevent';
        }
        else {
            className = type.toLowerCase();
        }
        skeletonEl = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["htmlToElement"])('<div class="fc-' + className + '-skeleton">' +
            '<table><tr></tr></table>' +
            '</div>');
        trEl = skeletonEl.getElementsByTagName('tr')[0];
        if (startCol > 0) {
            Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["appendToElement"])(trEl, 
            // will create (startCol + 1) td's
            new Array(startCol + 1).join(EMPTY_CELL_HTML));
        }
        seg.el.colSpan = endCol - startCol;
        trEl.appendChild(seg.el);
        if (endCol < colCnt) {
            Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["appendToElement"])(trEl, 
            // will create (colCnt - endCol) td's
            new Array(colCnt - endCol + 1).join(EMPTY_CELL_HTML));
        }
        var introHtml = dayGrid.renderProps.renderIntroHtml();
        if (introHtml) {
            if (isRtl) {
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["appendToElement"])(trEl, introHtml);
            }
            else {
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["prependToElement"])(trEl, introHtml);
            }
        }
        return skeletonEl;
    };
    return DayGridFillRenderer;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["FillRenderer"]));

var DayTile = /** @class */ (function (_super) {
    __extends(DayTile, _super);
    function DayTile(el) {
        var _this = _super.call(this, el) || this;
        var eventRenderer = _this.eventRenderer = new DayTileEventRenderer(_this);
        var renderFrame = _this.renderFrame = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(_this._renderFrame);
        _this.renderFgEvents = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(eventRenderer.renderSegs.bind(eventRenderer), eventRenderer.unrender.bind(eventRenderer), [renderFrame]);
        _this.renderEventSelection = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(eventRenderer.selectByInstanceId.bind(eventRenderer), eventRenderer.unselectByInstanceId.bind(eventRenderer), [_this.renderFgEvents]);
        _this.renderEventDrag = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(eventRenderer.hideByHash.bind(eventRenderer), eventRenderer.showByHash.bind(eventRenderer), [renderFrame]);
        _this.renderEventResize = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(eventRenderer.hideByHash.bind(eventRenderer), eventRenderer.showByHash.bind(eventRenderer), [renderFrame]);
        return _this;
    }
    DayTile.prototype.firstContext = function (context) {
        context.calendar.registerInteractiveComponent(this, {
            el: this.el,
            useEventCenter: false
        });
    };
    DayTile.prototype.render = function (props, context) {
        this.renderFrame(props.date);
        this.renderFgEvents(context, props.fgSegs);
        this.renderEventSelection(props.eventSelection);
        this.renderEventDrag(props.eventDragInstances);
        this.renderEventResize(props.eventResizeInstances);
    };
    DayTile.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.renderFrame.unrender(); // should unrender everything else
        this.context.calendar.unregisterInteractiveComponent(this);
    };
    DayTile.prototype._renderFrame = function (date) {
        var _a = this.context, theme = _a.theme, dateEnv = _a.dateEnv, options = _a.options;
        var title = dateEnv.format(date, Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createFormatter"])(options.dayPopoverFormat) // TODO: cache
        );
        this.el.innerHTML =
            '<div class="fc-header ' + theme.getClass('popoverHeader') + '">' +
                '<span class="fc-title">' +
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["htmlEscape"])(title) +
                '</span>' +
                '<span class="fc-close ' + theme.getIconClass('close') + '"></span>' +
                '</div>' +
                '<div class="fc-body ' + theme.getClass('popoverContent') + '">' +
                '<div class="fc-event-container"></div>' +
                '</div>';
        this.segContainerEl = this.el.querySelector('.fc-event-container');
    };
    DayTile.prototype.queryHit = function (positionLeft, positionTop, elWidth, elHeight) {
        var date = this.props.date; // HACK
        if (positionLeft < elWidth && positionTop < elHeight) {
            return {
                component: this,
                dateSpan: {
                    allDay: true,
                    range: { start: date, end: Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["addDays"])(date, 1) }
                },
                dayEl: this.el,
                rect: {
                    left: 0,
                    top: 0,
                    right: elWidth,
                    bottom: elHeight
                },
                layer: 1
            };
        }
    };
    return DayTile;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["DateComponent"]));
var DayTileEventRenderer = /** @class */ (function (_super) {
    __extends(DayTileEventRenderer, _super);
    function DayTileEventRenderer(dayTile) {
        var _this = _super.call(this) || this;
        _this.dayTile = dayTile;
        return _this;
    }
    DayTileEventRenderer.prototype.attachSegs = function (segs) {
        for (var _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
            var seg = segs_1[_i];
            this.dayTile.segContainerEl.appendChild(seg.el);
        }
    };
    DayTileEventRenderer.prototype.detachSegs = function (segs) {
        for (var _i = 0, segs_2 = segs; _i < segs_2.length; _i++) {
            var seg = segs_2[_i];
            Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["removeElement"])(seg.el);
        }
    };
    return DayTileEventRenderer;
}(SimpleDayGridEventRenderer));

var DayBgRow = /** @class */ (function () {
    function DayBgRow(context) {
        this.context = context;
    }
    DayBgRow.prototype.renderHtml = function (props) {
        var parts = [];
        if (props.renderIntroHtml) {
            parts.push(props.renderIntroHtml());
        }
        for (var _i = 0, _a = props.cells; _i < _a.length; _i++) {
            var cell = _a[_i];
            parts.push(renderCellHtml(cell.date, props.dateProfile, this.context, cell.htmlAttrs));
        }
        if (!props.cells.length) {
            parts.push('<td class="fc-day ' + this.context.theme.getClass('widgetContent') + '"></td>');
        }
        if (this.context.options.dir === 'rtl') {
            parts.reverse();
        }
        return '<tr>' + parts.join('') + '</tr>';
    };
    return DayBgRow;
}());
function renderCellHtml(date, dateProfile, context, otherAttrs) {
    var dateEnv = context.dateEnv, theme = context.theme;
    var isDateValid = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["rangeContainsMarker"])(dateProfile.activeRange, date); // TODO: called too frequently. cache somehow.
    var classes = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["getDayClasses"])(date, dateProfile, context);
    classes.unshift('fc-day', theme.getClass('widgetContent'));
    return '<td class="' + classes.join(' ') + '"' +
        (isDateValid ?
            ' data-date="' + dateEnv.formatIso(date, { omitTime: true }) + '"' :
            '') +
        (otherAttrs ?
            ' ' + otherAttrs :
            '') +
        '></td>';
}

var DAY_NUM_FORMAT = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createFormatter"])({ day: 'numeric' });
var WEEK_NUM_FORMAT = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createFormatter"])({ week: 'numeric' });
var DayGrid = /** @class */ (function (_super) {
    __extends(DayGrid, _super);
    function DayGrid(el, renderProps) {
        var _this = _super.call(this, el) || this;
        _this.bottomCoordPadding = 0; // hack for extending the hit area for the last row of the coordinate grid
        _this.isCellSizesDirty = false;
        _this.renderProps = renderProps;
        var eventRenderer = _this.eventRenderer = new DayGridEventRenderer(_this);
        var fillRenderer = _this.fillRenderer = new DayGridFillRenderer(_this);
        _this.mirrorRenderer = new DayGridMirrorRenderer(_this);
        var renderCells = _this.renderCells = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(_this._renderCells, _this._unrenderCells);
        _this.renderBusinessHours = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(fillRenderer.renderSegs.bind(fillRenderer, 'businessHours'), fillRenderer.unrender.bind(fillRenderer, 'businessHours'), [renderCells]);
        _this.renderDateSelection = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(fillRenderer.renderSegs.bind(fillRenderer, 'highlight'), fillRenderer.unrender.bind(fillRenderer, 'highlight'), [renderCells]);
        _this.renderBgEvents = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(fillRenderer.renderSegs.bind(fillRenderer, 'bgEvent'), fillRenderer.unrender.bind(fillRenderer, 'bgEvent'), [renderCells]);
        _this.renderFgEvents = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(eventRenderer.renderSegs.bind(eventRenderer), eventRenderer.unrender.bind(eventRenderer), [renderCells]);
        _this.renderEventSelection = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(eventRenderer.selectByInstanceId.bind(eventRenderer), eventRenderer.unselectByInstanceId.bind(eventRenderer), [_this.renderFgEvents]);
        _this.renderEventDrag = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(_this._renderEventDrag, _this._unrenderEventDrag, [renderCells]);
        _this.renderEventResize = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(_this._renderEventResize, _this._unrenderEventResize, [renderCells]);
        return _this;
    }
    DayGrid.prototype.render = function (props, context) {
        var cells = props.cells;
        this.rowCnt = cells.length;
        this.colCnt = cells[0].length;
        this.renderCells(cells, props.isRigid);
        this.renderBusinessHours(context, props.businessHourSegs);
        this.renderDateSelection(context, props.dateSelectionSegs);
        this.renderBgEvents(context, props.bgEventSegs);
        this.renderFgEvents(context, props.fgEventSegs);
        this.renderEventSelection(props.eventSelection);
        this.renderEventDrag(props.eventDrag);
        this.renderEventResize(props.eventResize);
        if (this.segPopoverTile) {
            this.updateSegPopoverTile();
        }
    };
    DayGrid.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.renderCells.unrender(); // will unrender everything else
    };
    DayGrid.prototype.getCellRange = function (row, col) {
        var start = this.props.cells[row][col].date;
        var end = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["addDays"])(start, 1);
        return { start: start, end: end };
    };
    DayGrid.prototype.updateSegPopoverTile = function (date, segs) {
        var ownProps = this.props;
        this.segPopoverTile.receiveProps({
            date: date || this.segPopoverTile.props.date,
            fgSegs: segs || this.segPopoverTile.props.fgSegs,
            eventSelection: ownProps.eventSelection,
            eventDragInstances: ownProps.eventDrag ? ownProps.eventDrag.affectedInstances : null,
            eventResizeInstances: ownProps.eventResize ? ownProps.eventResize.affectedInstances : null
        }, this.context);
    };
    /* Date Rendering
    ------------------------------------------------------------------------------------------------------------------*/
    DayGrid.prototype._renderCells = function (cells, isRigid) {
        var _a = this.context, calendar = _a.calendar, view = _a.view, isRtl = _a.isRtl, dateEnv = _a.dateEnv;
        var _b = this, rowCnt = _b.rowCnt, colCnt = _b.colCnt;
        var html = '';
        var row;
        var col;
        for (row = 0; row < rowCnt; row++) {
            html += this.renderDayRowHtml(row, isRigid);
        }
        this.el.innerHTML = html;
        this.rowEls = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["findElements"])(this.el, '.fc-row');
        this.cellEls = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["findElements"])(this.el, '.fc-day, .fc-disabled-day');
        if (isRtl) {
            this.cellEls.reverse();
        }
        this.rowPositions = new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["PositionCache"](this.el, this.rowEls, false, true // vertical
        );
        this.colPositions = new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["PositionCache"](this.el, this.cellEls.slice(0, colCnt), // only the first row
        true, false // horizontal
        );
        // trigger dayRender with each cell's element
        for (row = 0; row < rowCnt; row++) {
            for (col = 0; col < colCnt; col++) {
                calendar.publiclyTrigger('dayRender', [
                    {
                        date: dateEnv.toDate(cells[row][col].date),
                        el: this.getCellEl(row, col),
                        view: view
                    }
                ]);
            }
        }
        this.isCellSizesDirty = true;
    };
    DayGrid.prototype._unrenderCells = function () {
        this.removeSegPopover();
    };
    // Generates the HTML for a single row, which is a div that wraps a table.
    // `row` is the row number.
    DayGrid.prototype.renderDayRowHtml = function (row, isRigid) {
        var theme = this.context.theme;
        var classes = ['fc-row', 'fc-week', theme.getClass('dayRow')];
        if (isRigid) {
            classes.push('fc-rigid');
        }
        var bgRow = new DayBgRow(this.context);
        return '' +
            '<div class="' + classes.join(' ') + '">' +
            '<div class="fc-bg">' +
            '<table class="' + theme.getClass('tableGrid') + '">' +
            bgRow.renderHtml({
                cells: this.props.cells[row],
                dateProfile: this.props.dateProfile,
                renderIntroHtml: this.renderProps.renderBgIntroHtml
            }) +
            '</table>' +
            '</div>' +
            '<div class="fc-content-skeleton">' +
            '<table>' +
            (this.getIsNumbersVisible() ?
                '<thead>' +
                    this.renderNumberTrHtml(row) +
                    '</thead>' :
                '') +
            '</table>' +
            '</div>' +
            '</div>';
    };
    DayGrid.prototype.getIsNumbersVisible = function () {
        return this.getIsDayNumbersVisible() ||
            this.renderProps.cellWeekNumbersVisible ||
            this.renderProps.colWeekNumbersVisible;
    };
    DayGrid.prototype.getIsDayNumbersVisible = function () {
        return this.rowCnt > 1;
    };
    /* Grid Number Rendering
    ------------------------------------------------------------------------------------------------------------------*/
    DayGrid.prototype.renderNumberTrHtml = function (row) {
        var isRtl = this.context.isRtl;
        var intro = this.renderProps.renderNumberIntroHtml(row, this);
        return '' +
            '<tr>' +
            (isRtl ? '' : intro) +
            this.renderNumberCellsHtml(row) +
            (isRtl ? intro : '') +
            '</tr>';
    };
    DayGrid.prototype.renderNumberCellsHtml = function (row) {
        var htmls = [];
        var col;
        var date;
        for (col = 0; col < this.colCnt; col++) {
            date = this.props.cells[row][col].date;
            htmls.push(this.renderNumberCellHtml(date));
        }
        if (this.context.isRtl) {
            htmls.reverse();
        }
        return htmls.join('');
    };
    // Generates the HTML for the <td>s of the "number" row in the DayGrid's content skeleton.
    // The number row will only exist if either day numbers or week numbers are turned on.
    DayGrid.prototype.renderNumberCellHtml = function (date) {
        var _a = this.context, dateEnv = _a.dateEnv, options = _a.options;
        var html = '';
        var isDateValid = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["rangeContainsMarker"])(this.props.dateProfile.activeRange, date); // TODO: called too frequently. cache somehow.
        var isDayNumberVisible = this.getIsDayNumbersVisible() && isDateValid;
        var classes;
        var weekCalcFirstDow;
        if (!isDayNumberVisible && !this.renderProps.cellWeekNumbersVisible) {
            // no numbers in day cell (week number must be along the side)
            return '<td></td>'; //  will create an empty space above events :(
        }
        classes = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["getDayClasses"])(date, this.props.dateProfile, this.context);
        classes.unshift('fc-day-top');
        if (this.renderProps.cellWeekNumbersVisible) {
            weekCalcFirstDow = dateEnv.weekDow;
        }
        html += '<td class="' + classes.join(' ') + '"' +
            (isDateValid ?
                ' data-date="' + dateEnv.formatIso(date, { omitTime: true }) + '"' :
                '') +
            '>';
        if (this.renderProps.cellWeekNumbersVisible && (date.getUTCDay() === weekCalcFirstDow)) {
            html += Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["buildGotoAnchorHtml"])(options, dateEnv, { date: date, type: 'week' }, { 'class': 'fc-week-number' }, dateEnv.format(date, WEEK_NUM_FORMAT) // inner HTML
            );
        }
        if (isDayNumberVisible) {
            html += Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["buildGotoAnchorHtml"])(options, dateEnv, date, { 'class': 'fc-day-number' }, dateEnv.format(date, DAY_NUM_FORMAT) // inner HTML
            );
        }
        html += '</td>';
        return html;
    };
    /* Sizing
    ------------------------------------------------------------------------------------------------------------------*/
    DayGrid.prototype.updateSize = function (isResize) {
        var calendar = this.context.calendar;
        var _a = this, fillRenderer = _a.fillRenderer, eventRenderer = _a.eventRenderer, mirrorRenderer = _a.mirrorRenderer;
        if (isResize ||
            this.isCellSizesDirty ||
            calendar.isEventsUpdated // hack
        ) {
            this.buildPositionCaches();
            this.isCellSizesDirty = false;
        }
        fillRenderer.computeSizes(isResize);
        eventRenderer.computeSizes(isResize);
        mirrorRenderer.computeSizes(isResize);
        fillRenderer.assignSizes(isResize);
        eventRenderer.assignSizes(isResize);
        mirrorRenderer.assignSizes(isResize);
    };
    DayGrid.prototype.buildPositionCaches = function () {
        this.buildColPositions();
        this.buildRowPositions();
    };
    DayGrid.prototype.buildColPositions = function () {
        this.colPositions.build();
    };
    DayGrid.prototype.buildRowPositions = function () {
        this.rowPositions.build();
        this.rowPositions.bottoms[this.rowCnt - 1] += this.bottomCoordPadding; // hack
    };
    /* Hit System
    ------------------------------------------------------------------------------------------------------------------*/
    DayGrid.prototype.positionToHit = function (leftPosition, topPosition) {
        var _a = this, colPositions = _a.colPositions, rowPositions = _a.rowPositions;
        var col = colPositions.leftToIndex(leftPosition);
        var row = rowPositions.topToIndex(topPosition);
        if (row != null && col != null) {
            return {
                row: row,
                col: col,
                dateSpan: {
                    range: this.getCellRange(row, col),
                    allDay: true
                },
                dayEl: this.getCellEl(row, col),
                relativeRect: {
                    left: colPositions.lefts[col],
                    right: colPositions.rights[col],
                    top: rowPositions.tops[row],
                    bottom: rowPositions.bottoms[row]
                }
            };
        }
    };
    /* Cell System
    ------------------------------------------------------------------------------------------------------------------*/
    // FYI: the first column is the leftmost column, regardless of date
    DayGrid.prototype.getCellEl = function (row, col) {
        return this.cellEls[row * this.colCnt + col];
    };
    /* Event Drag Visualization
    ------------------------------------------------------------------------------------------------------------------*/
    DayGrid.prototype._renderEventDrag = function (state) {
        if (state) {
            this.eventRenderer.hideByHash(state.affectedInstances);
            this.fillRenderer.renderSegs('highlight', this.context, state.segs);
        }
    };
    DayGrid.prototype._unrenderEventDrag = function (state) {
        if (state) {
            this.eventRenderer.showByHash(state.affectedInstances);
            this.fillRenderer.unrender('highlight', this.context);
        }
    };
    /* Event Resize Visualization
    ------------------------------------------------------------------------------------------------------------------*/
    DayGrid.prototype._renderEventResize = function (state) {
        if (state) {
            this.eventRenderer.hideByHash(state.affectedInstances);
            this.fillRenderer.renderSegs('highlight', this.context, state.segs);
            this.mirrorRenderer.renderSegs(this.context, state.segs, { isResizing: true, sourceSeg: state.sourceSeg });
        }
    };
    DayGrid.prototype._unrenderEventResize = function (state) {
        if (state) {
            this.eventRenderer.showByHash(state.affectedInstances);
            this.fillRenderer.unrender('highlight', this.context);
            this.mirrorRenderer.unrender(this.context, state.segs, { isResizing: true, sourceSeg: state.sourceSeg });
        }
    };
    /* More+ Link Popover
    ------------------------------------------------------------------------------------------------------------------*/
    DayGrid.prototype.removeSegPopover = function () {
        if (this.segPopover) {
            this.segPopover.hide(); // in handler, will call segPopover's removeElement
        }
    };
    // Limits the number of "levels" (vertically stacking layers of events) for each row of the grid.
    // `levelLimit` can be false (don't limit), a number, or true (should be computed).
    DayGrid.prototype.limitRows = function (levelLimit) {
        var rowStructs = this.eventRenderer.rowStructs || [];
        var row; // row #
        var rowLevelLimit;
        for (row = 0; row < rowStructs.length; row++) {
            this.unlimitRow(row);
            if (!levelLimit) {
                rowLevelLimit = false;
            }
            else if (typeof levelLimit === 'number') {
                rowLevelLimit = levelLimit;
            }
            else {
                rowLevelLimit = this.computeRowLevelLimit(row);
            }
            if (rowLevelLimit !== false) {
                this.limitRow(row, rowLevelLimit);
            }
        }
    };
    // Computes the number of levels a row will accomodate without going outside its bounds.
    // Assumes the row is "rigid" (maintains a constant height regardless of what is inside).
    // `row` is the row number.
    DayGrid.prototype.computeRowLevelLimit = function (row) {
        var rowEl = this.rowEls[row]; // the containing "fake" row div
        var rowBottom = rowEl.getBoundingClientRect().bottom; // relative to viewport!
        var trEls = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["findChildren"])(this.eventRenderer.rowStructs[row].tbodyEl);
        var i;
        var trEl;
        // Reveal one level <tr> at a time and stop when we find one out of bounds
        for (i = 0; i < trEls.length; i++) {
            trEl = trEls[i];
            trEl.classList.remove('fc-limited'); // reset to original state (reveal)
            if (trEl.getBoundingClientRect().bottom > rowBottom) {
                return i;
            }
        }
        return false; // should not limit at all
    };
    // Limits the given grid row to the maximum number of levels and injects "more" links if necessary.
    // `row` is the row number.
    // `levelLimit` is a number for the maximum (inclusive) number of levels allowed.
    DayGrid.prototype.limitRow = function (row, levelLimit) {
        var _this = this;
        var colCnt = this.colCnt;
        var isRtl = this.context.isRtl;
        var rowStruct = this.eventRenderer.rowStructs[row];
        var moreNodes = []; // array of "more" <a> links and <td> DOM nodes
        var col = 0; // col #, left-to-right (not chronologically)
        var levelSegs; // array of segment objects in the last allowable level, ordered left-to-right
        var cellMatrix; // a matrix (by level, then column) of all <td> elements in the row
        var limitedNodes; // array of temporarily hidden level <tr> and segment <td> DOM nodes
        var i;
        var seg;
        var segsBelow; // array of segment objects below `seg` in the current `col`
        var totalSegsBelow; // total number of segments below `seg` in any of the columns `seg` occupies
        var colSegsBelow; // array of segment arrays, below seg, one for each column (offset from segs's first column)
        var td;
        var rowSpan;
        var segMoreNodes; // array of "more" <td> cells that will stand-in for the current seg's cell
        var j;
        var moreTd;
        var moreWrap;
        var moreLink;
        // Iterates through empty level cells and places "more" links inside if need be
        var emptyCellsUntil = function (endCol) {
            while (col < endCol) {
                segsBelow = _this.getCellSegs(row, col, levelLimit);
                if (segsBelow.length) {
                    td = cellMatrix[levelLimit - 1][col];
                    moreLink = _this.renderMoreLink(row, col, segsBelow);
                    moreWrap = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createElement"])('div', null, moreLink);
                    td.appendChild(moreWrap);
                    moreNodes.push(moreWrap);
                }
                col++;
            }
        };
        if (levelLimit && levelLimit < rowStruct.segLevels.length) { // is it actually over the limit?
            levelSegs = rowStruct.segLevels[levelLimit - 1];
            cellMatrix = rowStruct.cellMatrix;
            limitedNodes = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["findChildren"])(rowStruct.tbodyEl).slice(levelLimit); // get level <tr> elements past the limit
            limitedNodes.forEach(function (node) {
                node.classList.add('fc-limited'); // hide elements and get a simple DOM-nodes array
            });
            // iterate though segments in the last allowable level
            for (i = 0; i < levelSegs.length; i++) {
                seg = levelSegs[i];
                var leftCol = isRtl ? (colCnt - 1 - seg.lastCol) : seg.firstCol;
                var rightCol = isRtl ? (colCnt - 1 - seg.firstCol) : seg.lastCol;
                emptyCellsUntil(leftCol); // process empty cells before the segment
                // determine *all* segments below `seg` that occupy the same columns
                colSegsBelow = [];
                totalSegsBelow = 0;
                while (col <= rightCol) {
                    segsBelow = this.getCellSegs(row, col, levelLimit);
                    colSegsBelow.push(segsBelow);
                    totalSegsBelow += segsBelow.length;
                    col++;
                }
                if (totalSegsBelow) { // do we need to replace this segment with one or many "more" links?
                    td = cellMatrix[levelLimit - 1][leftCol]; // the segment's parent cell
                    rowSpan = td.rowSpan || 1;
                    segMoreNodes = [];
                    // make a replacement <td> for each column the segment occupies. will be one for each colspan
                    for (j = 0; j < colSegsBelow.length; j++) {
                        moreTd = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createElement"])('td', { className: 'fc-more-cell', rowSpan: rowSpan });
                        segsBelow = colSegsBelow[j];
                        moreLink = this.renderMoreLink(row, leftCol + j, [seg].concat(segsBelow) // count seg as hidden too
                        );
                        moreWrap = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createElement"])('div', null, moreLink);
                        moreTd.appendChild(moreWrap);
                        segMoreNodes.push(moreTd);
                        moreNodes.push(moreTd);
                    }
                    td.classList.add('fc-limited');
                    Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["insertAfterElement"])(td, segMoreNodes);
                    limitedNodes.push(td);
                }
            }
            emptyCellsUntil(this.colCnt); // finish off the level
            rowStruct.moreEls = moreNodes; // for easy undoing later
            rowStruct.limitedEls = limitedNodes; // for easy undoing later
        }
    };
    // Reveals all levels and removes all "more"-related elements for a grid's row.
    // `row` is a row number.
    DayGrid.prototype.unlimitRow = function (row) {
        var rowStruct = this.eventRenderer.rowStructs[row];
        if (rowStruct.moreEls) {
            rowStruct.moreEls.forEach(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["removeElement"]);
            rowStruct.moreEls = null;
        }
        if (rowStruct.limitedEls) {
            rowStruct.limitedEls.forEach(function (limitedEl) {
                limitedEl.classList.remove('fc-limited');
            });
            rowStruct.limitedEls = null;
        }
    };
    // Renders an <a> element that represents hidden event element for a cell.
    // Responsible for attaching click handler as well.
    DayGrid.prototype.renderMoreLink = function (row, col, hiddenSegs) {
        var _this = this;
        var _a = this.context, calendar = _a.calendar, view = _a.view, dateEnv = _a.dateEnv, options = _a.options, isRtl = _a.isRtl;
        var a = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createElement"])('a', { className: 'fc-more' });
        a.innerText = this.getMoreLinkText(hiddenSegs.length);
        a.addEventListener('click', function (ev) {
            var clickOption = options.eventLimitClick;
            var _col = isRtl ? _this.colCnt - col - 1 : col; // HACK: props.cells has different dir system?
            var date = _this.props.cells[row][_col].date;
            var moreEl = ev.currentTarget;
            var dayEl = _this.getCellEl(row, col);
            var allSegs = _this.getCellSegs(row, col);
            // rescope the segments to be within the cell's date
            var reslicedAllSegs = _this.resliceDaySegs(allSegs, date);
            var reslicedHiddenSegs = _this.resliceDaySegs(hiddenSegs, date);
            if (typeof clickOption === 'function') {
                // the returned value can be an atomic option
                clickOption = calendar.publiclyTrigger('eventLimitClick', [
                    {
                        date: dateEnv.toDate(date),
                        allDay: true,
                        dayEl: dayEl,
                        moreEl: moreEl,
                        segs: reslicedAllSegs,
                        hiddenSegs: reslicedHiddenSegs,
                        jsEvent: ev,
                        view: view
                    }
                ]);
            }
            if (clickOption === 'popover') {
                _this.showSegPopover(row, col, moreEl, reslicedAllSegs);
            }
            else if (typeof clickOption === 'string') { // a view name
                calendar.zoomTo(date, clickOption);
            }
        });
        return a;
    };
    // Reveals the popover that displays all events within a cell
    DayGrid.prototype.showSegPopover = function (row, col, moreLink, segs) {
        var _this = this;
        var _a = this.context, calendar = _a.calendar, view = _a.view, theme = _a.theme, isRtl = _a.isRtl;
        var _col = isRtl ? this.colCnt - col - 1 : col; // HACK: props.cells has different dir system?
        var moreWrap = moreLink.parentNode; // the <div> wrapper around the <a>
        var topEl; // the element we want to match the top coordinate of
        var options;
        if (this.rowCnt === 1) {
            topEl = view.el; // will cause the popover to cover any sort of header
        }
        else {
            topEl = this.rowEls[row]; // will align with top of row
        }
        options = {
            className: 'fc-more-popover ' + theme.getClass('popover'),
            parentEl: view.el,
            top: Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["computeRect"])(topEl).top,
            autoHide: true,
            content: function (el) {
                _this.segPopoverTile = new DayTile(el);
                _this.updateSegPopoverTile(_this.props.cells[row][_col].date, segs);
            },
            hide: function () {
                _this.segPopoverTile.destroy();
                _this.segPopoverTile = null;
                _this.segPopover.destroy();
                _this.segPopover = null;
            }
        };
        // Determine horizontal coordinate.
        // We use the moreWrap instead of the <td> to avoid border confusion.
        if (isRtl) {
            options.right = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["computeRect"])(moreWrap).right + 1; // +1 to be over cell border
        }
        else {
            options.left = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["computeRect"])(moreWrap).left - 1; // -1 to be over cell border
        }
        this.segPopover = new Popover(options);
        this.segPopover.show();
        calendar.releaseAfterSizingTriggers(); // hack for eventPositioned
    };
    // Given the events within an array of segment objects, reslice them to be in a single day
    DayGrid.prototype.resliceDaySegs = function (segs, dayDate) {
        var dayStart = dayDate;
        var dayEnd = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["addDays"])(dayStart, 1);
        var dayRange = { start: dayStart, end: dayEnd };
        var newSegs = [];
        for (var _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
            var seg = segs_1[_i];
            var eventRange = seg.eventRange;
            var origRange = eventRange.range;
            var slicedRange = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["intersectRanges"])(origRange, dayRange);
            if (slicedRange) {
                newSegs.push(__assign({}, seg, { eventRange: {
                        def: eventRange.def,
                        ui: __assign({}, eventRange.ui, { durationEditable: false }),
                        instance: eventRange.instance,
                        range: slicedRange
                    }, isStart: seg.isStart && slicedRange.start.valueOf() === origRange.start.valueOf(), isEnd: seg.isEnd && slicedRange.end.valueOf() === origRange.end.valueOf() }));
            }
        }
        return newSegs;
    };
    // Generates the text that should be inside a "more" link, given the number of events it represents
    DayGrid.prototype.getMoreLinkText = function (num) {
        var opt = this.context.options.eventLimitText;
        if (typeof opt === 'function') {
            return opt(num);
        }
        else {
            return '+' + num + ' ' + opt;
        }
    };
    // Returns segments within a given cell.
    // If `startLevel` is specified, returns only events including and below that level. Otherwise returns all segs.
    DayGrid.prototype.getCellSegs = function (row, col, startLevel) {
        var segMatrix = this.eventRenderer.rowStructs[row].segMatrix;
        var level = startLevel || 0;
        var segs = [];
        var seg;
        while (level < segMatrix.length) {
            seg = segMatrix[level][col];
            if (seg) {
                segs.push(seg);
            }
            level++;
        }
        return segs;
    };
    return DayGrid;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["DateComponent"]));

var WEEK_NUM_FORMAT$1 = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createFormatter"])({ week: 'numeric' });
/* An abstract class for the daygrid views, as well as month view. Renders one or more rows of day cells.
----------------------------------------------------------------------------------------------------------------------*/
// It is a manager for a DayGrid subcomponent, which does most of the heavy lifting.
// It is responsible for managing width/height.
var AbstractDayGridView = /** @class */ (function (_super) {
    __extends(AbstractDayGridView, _super);
    function AbstractDayGridView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.processOptions = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoize"])(_this._processOptions);
        _this.renderSkeleton = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(_this._renderSkeleton, _this._unrenderSkeleton);
        /* Header Rendering
        ------------------------------------------------------------------------------------------------------------------*/
        // Generates the HTML that will go before the day-of week header cells
        _this.renderHeadIntroHtml = function () {
            var _a = _this.context, theme = _a.theme, options = _a.options;
            if (_this.colWeekNumbersVisible) {
                return '' +
                    '<th class="fc-week-number ' + theme.getClass('widgetHeader') + '" ' + _this.weekNumberStyleAttr() + '>' +
                    '<span>' + // needed for matchCellWidths
                    Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["htmlEscape"])(options.weekLabel) +
                    '</span>' +
                    '</th>';
            }
            return '';
        };
        /* Day Grid Rendering
        ------------------------------------------------------------------------------------------------------------------*/
        // Generates the HTML that will go before content-skeleton cells that display the day/week numbers
        _this.renderDayGridNumberIntroHtml = function (row, dayGrid) {
            var _a = _this.context, options = _a.options, dateEnv = _a.dateEnv;
            var weekStart = dayGrid.props.cells[row][0].date;
            if (_this.colWeekNumbersVisible) {
                return '' +
                    '<td class="fc-week-number" ' + _this.weekNumberStyleAttr() + '>' +
                    Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["buildGotoAnchorHtml"])(// aside from link, important for matchCellWidths
                    options, dateEnv, { date: weekStart, type: 'week', forceOff: dayGrid.colCnt === 1 }, dateEnv.format(weekStart, WEEK_NUM_FORMAT$1) // inner HTML
                    ) +
                    '</td>';
            }
            return '';
        };
        // Generates the HTML that goes before the day bg cells for each day-row
        _this.renderDayGridBgIntroHtml = function () {
            var theme = _this.context.theme;
            if (_this.colWeekNumbersVisible) {
                return '<td class="fc-week-number ' + theme.getClass('widgetContent') + '" ' + _this.weekNumberStyleAttr() + '></td>';
            }
            return '';
        };
        // Generates the HTML that goes before every other type of row generated by DayGrid.
        // Affects mirror-skeleton and highlight-skeleton rows.
        _this.renderDayGridIntroHtml = function () {
            if (_this.colWeekNumbersVisible) {
                return '<td class="fc-week-number" ' + _this.weekNumberStyleAttr() + '></td>';
            }
            return '';
        };
        return _this;
    }
    AbstractDayGridView.prototype._processOptions = function (options) {
        if (options.weekNumbers) {
            if (options.weekNumbersWithinDays) {
                this.cellWeekNumbersVisible = true;
                this.colWeekNumbersVisible = false;
            }
            else {
                this.cellWeekNumbersVisible = false;
                this.colWeekNumbersVisible = true;
            }
        }
        else {
            this.colWeekNumbersVisible = false;
            this.cellWeekNumbersVisible = false;
        }
    };
    AbstractDayGridView.prototype.render = function (props, context) {
        _super.prototype.render.call(this, props, context);
        this.processOptions(context.options);
        this.renderSkeleton(context);
    };
    AbstractDayGridView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.renderSkeleton.unrender();
    };
    AbstractDayGridView.prototype._renderSkeleton = function (context) {
        this.el.classList.add('fc-dayGrid-view');
        this.el.innerHTML = this.renderSkeletonHtml();
        this.scroller = new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["ScrollComponent"]('hidden', // overflow x
        'auto' // overflow y
        );
        var dayGridContainerEl = this.scroller.el;
        this.el.querySelector('.fc-body > tr > td').appendChild(dayGridContainerEl);
        dayGridContainerEl.classList.add('fc-day-grid-container');
        var dayGridEl = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createElement"])('div', { className: 'fc-day-grid' });
        dayGridContainerEl.appendChild(dayGridEl);
        this.dayGrid = new DayGrid(dayGridEl, {
            renderNumberIntroHtml: this.renderDayGridNumberIntroHtml,
            renderBgIntroHtml: this.renderDayGridBgIntroHtml,
            renderIntroHtml: this.renderDayGridIntroHtml,
            colWeekNumbersVisible: this.colWeekNumbersVisible,
            cellWeekNumbersVisible: this.cellWeekNumbersVisible
        });
    };
    AbstractDayGridView.prototype._unrenderSkeleton = function () {
        this.el.classList.remove('fc-dayGrid-view');
        this.dayGrid.destroy();
        this.scroller.destroy();
    };
    // Builds the HTML skeleton for the view.
    // The day-grid component will render inside of a container defined by this HTML.
    AbstractDayGridView.prototype.renderSkeletonHtml = function () {
        var _a = this.context, theme = _a.theme, options = _a.options;
        return '' +
            '<table class="' + theme.getClass('tableGrid') + '">' +
            (options.columnHeader ?
                '<thead class="fc-head">' +
                    '<tr>' +
                    '<td class="fc-head-container ' + theme.getClass('widgetHeader') + '">&nbsp;</td>' +
                    '</tr>' +
                    '</thead>' :
                '') +
            '<tbody class="fc-body">' +
            '<tr>' +
            '<td class="' + theme.getClass('widgetContent') + '"></td>' +
            '</tr>' +
            '</tbody>' +
            '</table>';
    };
    // Generates an HTML attribute string for setting the width of the week number column, if it is known
    AbstractDayGridView.prototype.weekNumberStyleAttr = function () {
        if (this.weekNumberWidth != null) {
            return 'style="width:' + this.weekNumberWidth + 'px"';
        }
        return '';
    };
    // Determines whether each row should have a constant height
    AbstractDayGridView.prototype.hasRigidRows = function () {
        var eventLimit = this.context.options.eventLimit;
        return eventLimit && typeof eventLimit !== 'number';
    };
    /* Dimensions
    ------------------------------------------------------------------------------------------------------------------*/
    AbstractDayGridView.prototype.updateSize = function (isResize, viewHeight, isAuto) {
        _super.prototype.updateSize.call(this, isResize, viewHeight, isAuto); // will call updateBaseSize. important that executes first
        this.dayGrid.updateSize(isResize);
    };
    // Refreshes the horizontal dimensions of the view
    AbstractDayGridView.prototype.updateBaseSize = function (isResize, viewHeight, isAuto) {
        var dayGrid = this.dayGrid;
        var eventLimit = this.context.options.eventLimit;
        var headRowEl = this.header ? this.header.el : null; // HACK
        var scrollerHeight;
        var scrollbarWidths;
        // hack to give the view some height prior to dayGrid's columns being rendered
        // TODO: separate setting height from scroller VS dayGrid.
        if (!dayGrid.rowEls) {
            if (!isAuto) {
                scrollerHeight = this.computeScrollerHeight(viewHeight);
                this.scroller.setHeight(scrollerHeight);
            }
            return;
        }
        if (this.colWeekNumbersVisible) {
            // Make sure all week number cells running down the side have the same width.
            this.weekNumberWidth = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["matchCellWidths"])(Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["findElements"])(this.el, '.fc-week-number'));
        }
        // reset all heights to be natural
        this.scroller.clear();
        if (headRowEl) {
            Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["uncompensateScroll"])(headRowEl);
        }
        dayGrid.removeSegPopover(); // kill the "more" popover if displayed
        // is the event limit a constant level number?
        if (eventLimit && typeof eventLimit === 'number') {
            dayGrid.limitRows(eventLimit); // limit the levels first so the height can redistribute after
        }
        // distribute the height to the rows
        // (viewHeight is a "recommended" value if isAuto)
        scrollerHeight = this.computeScrollerHeight(viewHeight);
        this.setGridHeight(scrollerHeight, isAuto);
        // is the event limit dynamically calculated?
        if (eventLimit && typeof eventLimit !== 'number') {
            dayGrid.limitRows(eventLimit); // limit the levels after the grid's row heights have been set
        }
        if (!isAuto) { // should we force dimensions of the scroll container?
            this.scroller.setHeight(scrollerHeight);
            scrollbarWidths = this.scroller.getScrollbarWidths();
            if (scrollbarWidths.left || scrollbarWidths.right) { // using scrollbars?
                if (headRowEl) {
                    Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["compensateScroll"])(headRowEl, scrollbarWidths);
                }
                // doing the scrollbar compensation might have created text overflow which created more height. redo
                scrollerHeight = this.computeScrollerHeight(viewHeight);
                this.scroller.setHeight(scrollerHeight);
            }
            // guarantees the same scrollbar widths
            this.scroller.lockOverflow(scrollbarWidths);
        }
    };
    // given a desired total height of the view, returns what the height of the scroller should be
    AbstractDayGridView.prototype.computeScrollerHeight = function (viewHeight) {
        return viewHeight -
            Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["subtractInnerElHeight"])(this.el, this.scroller.el); // everything that's NOT the scroller
    };
    // Sets the height of just the DayGrid component in this view
    AbstractDayGridView.prototype.setGridHeight = function (height, isAuto) {
        if (this.context.options.monthMode) {
            // if auto, make the height of each row the height that it would be if there were 6 weeks
            if (isAuto) {
                height *= this.dayGrid.rowCnt / 6;
            }
            Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["distributeHeight"])(this.dayGrid.rowEls, height, !isAuto); // if auto, don't compensate for height-hogging rows
        }
        else {
            if (isAuto) {
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["undistributeHeight"])(this.dayGrid.rowEls); // let the rows be their natural height with no expanding
            }
            else {
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["distributeHeight"])(this.dayGrid.rowEls, height, true); // true = compensate for height-hogging rows
            }
        }
    };
    /* Scroll
    ------------------------------------------------------------------------------------------------------------------*/
    AbstractDayGridView.prototype.computeDateScroll = function (duration) {
        return { top: 0 };
    };
    AbstractDayGridView.prototype.queryDateScroll = function () {
        return { top: this.scroller.getScrollTop() };
    };
    AbstractDayGridView.prototype.applyDateScroll = function (scroll) {
        if (scroll.top !== undefined) {
            this.scroller.setScrollTop(scroll.top);
        }
    };
    return AbstractDayGridView;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["View"]));
AbstractDayGridView.prototype.dateProfileGeneratorClass = DayGridDateProfileGenerator;

var SimpleDayGrid = /** @class */ (function (_super) {
    __extends(SimpleDayGrid, _super);
    function SimpleDayGrid(dayGrid) {
        var _this = _super.call(this, dayGrid.el) || this;
        _this.slicer = new DayGridSlicer();
        _this.dayGrid = dayGrid;
        return _this;
    }
    SimpleDayGrid.prototype.firstContext = function (context) {
        context.calendar.registerInteractiveComponent(this, { el: this.dayGrid.el });
    };
    SimpleDayGrid.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.context.calendar.unregisterInteractiveComponent(this);
    };
    SimpleDayGrid.prototype.render = function (props, context) {
        var dayGrid = this.dayGrid;
        var dateProfile = props.dateProfile, dayTable = props.dayTable;
        dayGrid.receiveContext(context); // hack because context is used in sliceProps
        dayGrid.receiveProps(__assign({}, this.slicer.sliceProps(props, dateProfile, props.nextDayThreshold, context.calendar, dayGrid, dayTable), { dateProfile: dateProfile, cells: dayTable.cells, isRigid: props.isRigid }), context);
    };
    SimpleDayGrid.prototype.buildPositionCaches = function () {
        this.dayGrid.buildPositionCaches();
    };
    SimpleDayGrid.prototype.queryHit = function (positionLeft, positionTop) {
        var rawHit = this.dayGrid.positionToHit(positionLeft, positionTop);
        if (rawHit) {
            return {
                component: this.dayGrid,
                dateSpan: rawHit.dateSpan,
                dayEl: rawHit.dayEl,
                rect: {
                    left: rawHit.relativeRect.left,
                    right: rawHit.relativeRect.right,
                    top: rawHit.relativeRect.top,
                    bottom: rawHit.relativeRect.bottom
                },
                layer: 0
            };
        }
    };
    return SimpleDayGrid;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["DateComponent"]));
var DayGridSlicer = /** @class */ (function (_super) {
    __extends(DayGridSlicer, _super);
    function DayGridSlicer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DayGridSlicer.prototype.sliceRange = function (dateRange, dayTable) {
        return dayTable.sliceRange(dateRange);
    };
    return DayGridSlicer;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["Slicer"]));

var DayGridView = /** @class */ (function (_super) {
    __extends(DayGridView, _super);
    function DayGridView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.buildDayTable = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoize"])(buildDayTable);
        return _this;
    }
    DayGridView.prototype.render = function (props, context) {
        _super.prototype.render.call(this, props, context); // will call _renderSkeleton/_unrenderSkeleton
        var dateProfile = this.props.dateProfile;
        var dayTable = this.dayTable =
            this.buildDayTable(dateProfile, props.dateProfileGenerator);
        if (this.header) {
            this.header.receiveProps({
                dateProfile: dateProfile,
                dates: dayTable.headerDates,
                datesRepDistinctDays: dayTable.rowCnt === 1,
                renderIntroHtml: this.renderHeadIntroHtml
            }, context);
        }
        this.simpleDayGrid.receiveProps({
            dateProfile: dateProfile,
            dayTable: dayTable,
            businessHours: props.businessHours,
            dateSelection: props.dateSelection,
            eventStore: props.eventStore,
            eventUiBases: props.eventUiBases,
            eventSelection: props.eventSelection,
            eventDrag: props.eventDrag,
            eventResize: props.eventResize,
            isRigid: this.hasRigidRows(),
            nextDayThreshold: this.context.nextDayThreshold
        }, context);
    };
    DayGridView.prototype._renderSkeleton = function (context) {
        _super.prototype._renderSkeleton.call(this, context);
        if (context.options.columnHeader) {
            this.header = new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["DayHeader"](this.el.querySelector('.fc-head-container'));
        }
        this.simpleDayGrid = new SimpleDayGrid(this.dayGrid);
    };
    DayGridView.prototype._unrenderSkeleton = function () {
        _super.prototype._unrenderSkeleton.call(this);
        if (this.header) {
            this.header.destroy();
        }
        this.simpleDayGrid.destroy();
    };
    return DayGridView;
}(AbstractDayGridView));
function buildDayTable(dateProfile, dateProfileGenerator) {
    var daySeries = new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["DaySeries"](dateProfile.renderRange, dateProfileGenerator);
    return new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["DayTable"](daySeries, /year|month|week/.test(dateProfile.currentRangeUnit));
}

var main = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createPlugin"])({
    defaultView: 'dayGridMonth',
    views: {
        dayGrid: DayGridView,
        dayGridDay: {
            type: 'dayGrid',
            duration: { days: 1 }
        },
        dayGridWeek: {
            type: 'dayGrid',
            duration: { weeks: 1 }
        },
        dayGridMonth: {
            type: 'dayGrid',
            duration: { months: 1 },
            monthMode: true,
            fixedWeekCount: true
        }
    }
});

/* harmony default export */ __webpack_exports__["default"] = (main);



/***/ }),

/***/ "./node_modules/@fullcalendar/interaction/main.esm.js":
/*!************************************************************!*\
  !*** ./node_modules/@fullcalendar/interaction/main.esm.js ***!
  \************************************************************/
/*! exports provided: default, Draggable, FeaturefulElementDragging, PointerDragging, ThirdPartyDraggable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Draggable", function() { return ExternalDraggable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeaturefulElementDragging", function() { return FeaturefulElementDragging; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PointerDragging", function() { return PointerDragging; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThirdPartyDraggable", function() { return ThirdPartyDraggable; });
/* harmony import */ var _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fullcalendar/core */ "./node_modules/@fullcalendar/core/main.esm.js");
/*!
FullCalendar Interaction Plugin v4.4.2
Docs & License: https://fullcalendar.io/
(c) 2019 Adam Shaw
*/



/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["config"].touchMouseIgnoreWait = 500;
var ignoreMouseDepth = 0;
var listenerCnt = 0;
var isWindowTouchMoveCancelled = false;
/*
Uses a "pointer" abstraction, which monitors UI events for both mouse and touch.
Tracks when the pointer "drags" on a certain element, meaning down+move+up.

Also, tracks if there was touch-scrolling.
Also, can prevent touch-scrolling from happening.
Also, can fire pointermove events when scrolling happens underneath, even when no real pointer movement.

emits:
- pointerdown
- pointermove
- pointerup
*/
var PointerDragging = /** @class */ (function () {
    function PointerDragging(containerEl) {
        var _this = this;
        this.subjectEl = null;
        this.downEl = null;
        // options that can be directly assigned by caller
        this.selector = ''; // will cause subjectEl in all emitted events to be this element
        this.handleSelector = '';
        this.shouldIgnoreMove = false;
        this.shouldWatchScroll = true; // for simulating pointermove on scroll
        // internal states
        this.isDragging = false;
        this.isTouchDragging = false;
        this.wasTouchScroll = false;
        // Mouse
        // ----------------------------------------------------------------------------------------------------
        this.handleMouseDown = function (ev) {
            if (!_this.shouldIgnoreMouse() &&
                isPrimaryMouseButton(ev) &&
                _this.tryStart(ev)) {
                var pev = _this.createEventFromMouse(ev, true);
                _this.emitter.trigger('pointerdown', pev);
                _this.initScrollWatch(pev);
                if (!_this.shouldIgnoreMove) {
                    document.addEventListener('mousemove', _this.handleMouseMove);
                }
                document.addEventListener('mouseup', _this.handleMouseUp);
            }
        };
        this.handleMouseMove = function (ev) {
            var pev = _this.createEventFromMouse(ev);
            _this.recordCoords(pev);
            _this.emitter.trigger('pointermove', pev);
        };
        this.handleMouseUp = function (ev) {
            document.removeEventListener('mousemove', _this.handleMouseMove);
            document.removeEventListener('mouseup', _this.handleMouseUp);
            _this.emitter.trigger('pointerup', _this.createEventFromMouse(ev));
            _this.cleanup(); // call last so that pointerup has access to props
        };
        // Touch
        // ----------------------------------------------------------------------------------------------------
        this.handleTouchStart = function (ev) {
            if (_this.tryStart(ev)) {
                _this.isTouchDragging = true;
                var pev = _this.createEventFromTouch(ev, true);
                _this.emitter.trigger('pointerdown', pev);
                _this.initScrollWatch(pev);
                // unlike mouse, need to attach to target, not document
                // https://stackoverflow.com/a/45760014
                var target = ev.target;
                if (!_this.shouldIgnoreMove) {
                    target.addEventListener('touchmove', _this.handleTouchMove);
                }
                target.addEventListener('touchend', _this.handleTouchEnd);
                target.addEventListener('touchcancel', _this.handleTouchEnd); // treat it as a touch end
                // attach a handler to get called when ANY scroll action happens on the page.
                // this was impossible to do with normal on/off because 'scroll' doesn't bubble.
                // http://stackoverflow.com/a/32954565/96342
                window.addEventListener('scroll', _this.handleTouchScroll, true // useCapture
                );
            }
        };
        this.handleTouchMove = function (ev) {
            var pev = _this.createEventFromTouch(ev);
            _this.recordCoords(pev);
            _this.emitter.trigger('pointermove', pev);
        };
        this.handleTouchEnd = function (ev) {
            if (_this.isDragging) { // done to guard against touchend followed by touchcancel
                var target = ev.target;
                target.removeEventListener('touchmove', _this.handleTouchMove);
                target.removeEventListener('touchend', _this.handleTouchEnd);
                target.removeEventListener('touchcancel', _this.handleTouchEnd);
                window.removeEventListener('scroll', _this.handleTouchScroll, true); // useCaptured=true
                _this.emitter.trigger('pointerup', _this.createEventFromTouch(ev));
                _this.cleanup(); // call last so that pointerup has access to props
                _this.isTouchDragging = false;
                startIgnoringMouse();
            }
        };
        this.handleTouchScroll = function () {
            _this.wasTouchScroll = true;
        };
        this.handleScroll = function (ev) {
            if (!_this.shouldIgnoreMove) {
                var pageX = (window.pageXOffset - _this.prevScrollX) + _this.prevPageX;
                var pageY = (window.pageYOffset - _this.prevScrollY) + _this.prevPageY;
                _this.emitter.trigger('pointermove', {
                    origEvent: ev,
                    isTouch: _this.isTouchDragging,
                    subjectEl: _this.subjectEl,
                    pageX: pageX,
                    pageY: pageY,
                    deltaX: pageX - _this.origPageX,
                    deltaY: pageY - _this.origPageY
                });
            }
        };
        this.containerEl = containerEl;
        this.emitter = new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["EmitterMixin"]();
        containerEl.addEventListener('mousedown', this.handleMouseDown);
        containerEl.addEventListener('touchstart', this.handleTouchStart, { passive: true });
        listenerCreated();
    }
    PointerDragging.prototype.destroy = function () {
        this.containerEl.removeEventListener('mousedown', this.handleMouseDown);
        this.containerEl.removeEventListener('touchstart', this.handleTouchStart, { passive: true });
        listenerDestroyed();
    };
    PointerDragging.prototype.tryStart = function (ev) {
        var subjectEl = this.querySubjectEl(ev);
        var downEl = ev.target;
        if (subjectEl &&
            (!this.handleSelector || Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["elementClosest"])(downEl, this.handleSelector))) {
            this.subjectEl = subjectEl;
            this.downEl = downEl;
            this.isDragging = true; // do this first so cancelTouchScroll will work
            this.wasTouchScroll = false;
            return true;
        }
        return false;
    };
    PointerDragging.prototype.cleanup = function () {
        isWindowTouchMoveCancelled = false;
        this.isDragging = false;
        this.subjectEl = null;
        this.downEl = null;
        // keep wasTouchScroll around for later access
        this.destroyScrollWatch();
    };
    PointerDragging.prototype.querySubjectEl = function (ev) {
        if (this.selector) {
            return Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["elementClosest"])(ev.target, this.selector);
        }
        else {
            return this.containerEl;
        }
    };
    PointerDragging.prototype.shouldIgnoreMouse = function () {
        return ignoreMouseDepth || this.isTouchDragging;
    };
    // can be called by user of this class, to cancel touch-based scrolling for the current drag
    PointerDragging.prototype.cancelTouchScroll = function () {
        if (this.isDragging) {
            isWindowTouchMoveCancelled = true;
        }
    };
    // Scrolling that simulates pointermoves
    // ----------------------------------------------------------------------------------------------------
    PointerDragging.prototype.initScrollWatch = function (ev) {
        if (this.shouldWatchScroll) {
            this.recordCoords(ev);
            window.addEventListener('scroll', this.handleScroll, true); // useCapture=true
        }
    };
    PointerDragging.prototype.recordCoords = function (ev) {
        if (this.shouldWatchScroll) {
            this.prevPageX = ev.pageX;
            this.prevPageY = ev.pageY;
            this.prevScrollX = window.pageXOffset;
            this.prevScrollY = window.pageYOffset;
        }
    };
    PointerDragging.prototype.destroyScrollWatch = function () {
        if (this.shouldWatchScroll) {
            window.removeEventListener('scroll', this.handleScroll, true); // useCaptured=true
        }
    };
    // Event Normalization
    // ----------------------------------------------------------------------------------------------------
    PointerDragging.prototype.createEventFromMouse = function (ev, isFirst) {
        var deltaX = 0;
        var deltaY = 0;
        // TODO: repeat code
        if (isFirst) {
            this.origPageX = ev.pageX;
            this.origPageY = ev.pageY;
        }
        else {
            deltaX = ev.pageX - this.origPageX;
            deltaY = ev.pageY - this.origPageY;
        }
        return {
            origEvent: ev,
            isTouch: false,
            subjectEl: this.subjectEl,
            pageX: ev.pageX,
            pageY: ev.pageY,
            deltaX: deltaX,
            deltaY: deltaY
        };
    };
    PointerDragging.prototype.createEventFromTouch = function (ev, isFirst) {
        var touches = ev.touches;
        var pageX;
        var pageY;
        var deltaX = 0;
        var deltaY = 0;
        // if touch coords available, prefer,
        // because FF would give bad ev.pageX ev.pageY
        if (touches && touches.length) {
            pageX = touches[0].pageX;
            pageY = touches[0].pageY;
        }
        else {
            pageX = ev.pageX;
            pageY = ev.pageY;
        }
        // TODO: repeat code
        if (isFirst) {
            this.origPageX = pageX;
            this.origPageY = pageY;
        }
        else {
            deltaX = pageX - this.origPageX;
            deltaY = pageY - this.origPageY;
        }
        return {
            origEvent: ev,
            isTouch: true,
            subjectEl: this.subjectEl,
            pageX: pageX,
            pageY: pageY,
            deltaX: deltaX,
            deltaY: deltaY
        };
    };
    return PointerDragging;
}());
// Returns a boolean whether this was a left mouse click and no ctrl key (which means right click on Mac)
function isPrimaryMouseButton(ev) {
    return ev.button === 0 && !ev.ctrlKey;
}
// Ignoring fake mouse events generated by touch
// ----------------------------------------------------------------------------------------------------
function startIgnoringMouse() {
    ignoreMouseDepth++;
    setTimeout(function () {
        ignoreMouseDepth--;
    }, _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["config"].touchMouseIgnoreWait);
}
// We want to attach touchmove as early as possible for Safari
// ----------------------------------------------------------------------------------------------------
function listenerCreated() {
    if (!(listenerCnt++)) {
        window.addEventListener('touchmove', onWindowTouchMove, { passive: false });
    }
}
function listenerDestroyed() {
    if (!(--listenerCnt)) {
        window.removeEventListener('touchmove', onWindowTouchMove, { passive: false });
    }
}
function onWindowTouchMove(ev) {
    if (isWindowTouchMoveCancelled) {
        ev.preventDefault();
    }
}

/*
An effect in which an element follows the movement of a pointer across the screen.
The moving element is a clone of some other element.
Must call start + handleMove + stop.
*/
var ElementMirror = /** @class */ (function () {
    function ElementMirror() {
        this.isVisible = false; // must be explicitly enabled
        this.sourceEl = null;
        this.mirrorEl = null;
        this.sourceElRect = null; // screen coords relative to viewport
        // options that can be set directly by caller
        this.parentNode = document.body;
        this.zIndex = 9999;
        this.revertDuration = 0;
    }
    ElementMirror.prototype.start = function (sourceEl, pageX, pageY) {
        this.sourceEl = sourceEl;
        this.sourceElRect = this.sourceEl.getBoundingClientRect();
        this.origScreenX = pageX - window.pageXOffset;
        this.origScreenY = pageY - window.pageYOffset;
        this.deltaX = 0;
        this.deltaY = 0;
        this.updateElPosition();
    };
    ElementMirror.prototype.handleMove = function (pageX, pageY) {
        this.deltaX = (pageX - window.pageXOffset) - this.origScreenX;
        this.deltaY = (pageY - window.pageYOffset) - this.origScreenY;
        this.updateElPosition();
    };
    // can be called before start
    ElementMirror.prototype.setIsVisible = function (bool) {
        if (bool) {
            if (!this.isVisible) {
                if (this.mirrorEl) {
                    this.mirrorEl.style.display = '';
                }
                this.isVisible = bool; // needs to happen before updateElPosition
                this.updateElPosition(); // because was not updating the position while invisible
            }
        }
        else {
            if (this.isVisible) {
                if (this.mirrorEl) {
                    this.mirrorEl.style.display = 'none';
                }
                this.isVisible = bool;
            }
        }
    };
    // always async
    ElementMirror.prototype.stop = function (needsRevertAnimation, callback) {
        var _this = this;
        var done = function () {
            _this.cleanup();
            callback();
        };
        if (needsRevertAnimation &&
            this.mirrorEl &&
            this.isVisible &&
            this.revertDuration && // if 0, transition won't work
            (this.deltaX || this.deltaY) // if same coords, transition won't work
        ) {
            this.doRevertAnimation(done, this.revertDuration);
        }
        else {
            setTimeout(done, 0);
        }
    };
    ElementMirror.prototype.doRevertAnimation = function (callback, revertDuration) {
        var mirrorEl = this.mirrorEl;
        var finalSourceElRect = this.sourceEl.getBoundingClientRect(); // because autoscrolling might have happened
        mirrorEl.style.transition =
            'top ' + revertDuration + 'ms,' +
                'left ' + revertDuration + 'ms';
        Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["applyStyle"])(mirrorEl, {
            left: finalSourceElRect.left,
            top: finalSourceElRect.top
        });
        Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["whenTransitionDone"])(mirrorEl, function () {
            mirrorEl.style.transition = '';
            callback();
        });
    };
    ElementMirror.prototype.cleanup = function () {
        if (this.mirrorEl) {
            Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["removeElement"])(this.mirrorEl);
            this.mirrorEl = null;
        }
        this.sourceEl = null;
    };
    ElementMirror.prototype.updateElPosition = function () {
        if (this.sourceEl && this.isVisible) {
            Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["applyStyle"])(this.getMirrorEl(), {
                left: this.sourceElRect.left + this.deltaX,
                top: this.sourceElRect.top + this.deltaY
            });
        }
    };
    ElementMirror.prototype.getMirrorEl = function () {
        var sourceElRect = this.sourceElRect;
        var mirrorEl = this.mirrorEl;
        if (!mirrorEl) {
            mirrorEl = this.mirrorEl = this.sourceEl.cloneNode(true); // cloneChildren=true
            // we don't want long taps or any mouse interaction causing selection/menus.
            // would use preventSelection(), but that prevents selectstart, causing problems.
            mirrorEl.classList.add('fc-unselectable');
            mirrorEl.classList.add('fc-dragging');
            Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["applyStyle"])(mirrorEl, {
                position: 'fixed',
                zIndex: this.zIndex,
                visibility: '',
                boxSizing: 'border-box',
                width: sourceElRect.right - sourceElRect.left,
                height: sourceElRect.bottom - sourceElRect.top,
                right: 'auto',
                bottom: 'auto',
                margin: 0
            });
            this.parentNode.appendChild(mirrorEl);
        }
        return mirrorEl;
    };
    return ElementMirror;
}());

/*
Is a cache for a given element's scroll information (all the info that ScrollController stores)
in addition the "client rectangle" of the element.. the area within the scrollbars.

The cache can be in one of two modes:
- doesListening:false - ignores when the container is scrolled by someone else
- doesListening:true - watch for scrolling and update the cache
*/
var ScrollGeomCache = /** @class */ (function (_super) {
    __extends(ScrollGeomCache, _super);
    function ScrollGeomCache(scrollController, doesListening) {
        var _this = _super.call(this) || this;
        _this.handleScroll = function () {
            _this.scrollTop = _this.scrollController.getScrollTop();
            _this.scrollLeft = _this.scrollController.getScrollLeft();
            _this.handleScrollChange();
        };
        _this.scrollController = scrollController;
        _this.doesListening = doesListening;
        _this.scrollTop = _this.origScrollTop = scrollController.getScrollTop();
        _this.scrollLeft = _this.origScrollLeft = scrollController.getScrollLeft();
        _this.scrollWidth = scrollController.getScrollWidth();
        _this.scrollHeight = scrollController.getScrollHeight();
        _this.clientWidth = scrollController.getClientWidth();
        _this.clientHeight = scrollController.getClientHeight();
        _this.clientRect = _this.computeClientRect(); // do last in case it needs cached values
        if (_this.doesListening) {
            _this.getEventTarget().addEventListener('scroll', _this.handleScroll);
        }
        return _this;
    }
    ScrollGeomCache.prototype.destroy = function () {
        if (this.doesListening) {
            this.getEventTarget().removeEventListener('scroll', this.handleScroll);
        }
    };
    ScrollGeomCache.prototype.getScrollTop = function () {
        return this.scrollTop;
    };
    ScrollGeomCache.prototype.getScrollLeft = function () {
        return this.scrollLeft;
    };
    ScrollGeomCache.prototype.setScrollTop = function (top) {
        this.scrollController.setScrollTop(top);
        if (!this.doesListening) {
            // we are not relying on the element to normalize out-of-bounds scroll values
            // so we need to sanitize ourselves
            this.scrollTop = Math.max(Math.min(top, this.getMaxScrollTop()), 0);
            this.handleScrollChange();
        }
    };
    ScrollGeomCache.prototype.setScrollLeft = function (top) {
        this.scrollController.setScrollLeft(top);
        if (!this.doesListening) {
            // we are not relying on the element to normalize out-of-bounds scroll values
            // so we need to sanitize ourselves
            this.scrollLeft = Math.max(Math.min(top, this.getMaxScrollLeft()), 0);
            this.handleScrollChange();
        }
    };
    ScrollGeomCache.prototype.getClientWidth = function () {
        return this.clientWidth;
    };
    ScrollGeomCache.prototype.getClientHeight = function () {
        return this.clientHeight;
    };
    ScrollGeomCache.prototype.getScrollWidth = function () {
        return this.scrollWidth;
    };
    ScrollGeomCache.prototype.getScrollHeight = function () {
        return this.scrollHeight;
    };
    ScrollGeomCache.prototype.handleScrollChange = function () {
    };
    return ScrollGeomCache;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["ScrollController"]));
var ElementScrollGeomCache = /** @class */ (function (_super) {
    __extends(ElementScrollGeomCache, _super);
    function ElementScrollGeomCache(el, doesListening) {
        return _super.call(this, new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["ElementScrollController"](el), doesListening) || this;
    }
    ElementScrollGeomCache.prototype.getEventTarget = function () {
        return this.scrollController.el;
    };
    ElementScrollGeomCache.prototype.computeClientRect = function () {
        return Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["computeInnerRect"])(this.scrollController.el);
    };
    return ElementScrollGeomCache;
}(ScrollGeomCache));
var WindowScrollGeomCache = /** @class */ (function (_super) {
    __extends(WindowScrollGeomCache, _super);
    function WindowScrollGeomCache(doesListening) {
        return _super.call(this, new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["WindowScrollController"](), doesListening) || this;
    }
    WindowScrollGeomCache.prototype.getEventTarget = function () {
        return window;
    };
    WindowScrollGeomCache.prototype.computeClientRect = function () {
        return {
            left: this.scrollLeft,
            right: this.scrollLeft + this.clientWidth,
            top: this.scrollTop,
            bottom: this.scrollTop + this.clientHeight
        };
    };
    // the window is the only scroll object that changes it's rectangle relative
    // to the document's topleft as it scrolls
    WindowScrollGeomCache.prototype.handleScrollChange = function () {
        this.clientRect = this.computeClientRect();
    };
    return WindowScrollGeomCache;
}(ScrollGeomCache));

// If available we are using native "performance" API instead of "Date"
// Read more about it on MDN:
// https://developer.mozilla.org/en-US/docs/Web/API/Performance
var getTime = typeof performance === 'function' ? performance.now : Date.now;
/*
For a pointer interaction, automatically scrolls certain scroll containers when the pointer
approaches the edge.

The caller must call start + handleMove + stop.
*/
var AutoScroller = /** @class */ (function () {
    function AutoScroller() {
        var _this = this;
        // options that can be set by caller
        this.isEnabled = true;
        this.scrollQuery = [window, '.fc-scroller'];
        this.edgeThreshold = 50; // pixels
        this.maxVelocity = 300; // pixels per second
        // internal state
        this.pointerScreenX = null;
        this.pointerScreenY = null;
        this.isAnimating = false;
        this.scrollCaches = null;
        // protect against the initial pointerdown being too close to an edge and starting the scroll
        this.everMovedUp = false;
        this.everMovedDown = false;
        this.everMovedLeft = false;
        this.everMovedRight = false;
        this.animate = function () {
            if (_this.isAnimating) { // wasn't cancelled between animation calls
                var edge = _this.computeBestEdge(_this.pointerScreenX + window.pageXOffset, _this.pointerScreenY + window.pageYOffset);
                if (edge) {
                    var now = getTime();
                    _this.handleSide(edge, (now - _this.msSinceRequest) / 1000);
                    _this.requestAnimation(now);
                }
                else {
                    _this.isAnimating = false; // will stop animation
                }
            }
        };
    }
    AutoScroller.prototype.start = function (pageX, pageY) {
        if (this.isEnabled) {
            this.scrollCaches = this.buildCaches();
            this.pointerScreenX = null;
            this.pointerScreenY = null;
            this.everMovedUp = false;
            this.everMovedDown = false;
            this.everMovedLeft = false;
            this.everMovedRight = false;
            this.handleMove(pageX, pageY);
        }
    };
    AutoScroller.prototype.handleMove = function (pageX, pageY) {
        if (this.isEnabled) {
            var pointerScreenX = pageX - window.pageXOffset;
            var pointerScreenY = pageY - window.pageYOffset;
            var yDelta = this.pointerScreenY === null ? 0 : pointerScreenY - this.pointerScreenY;
            var xDelta = this.pointerScreenX === null ? 0 : pointerScreenX - this.pointerScreenX;
            if (yDelta < 0) {
                this.everMovedUp = true;
            }
            else if (yDelta > 0) {
                this.everMovedDown = true;
            }
            if (xDelta < 0) {
                this.everMovedLeft = true;
            }
            else if (xDelta > 0) {
                this.everMovedRight = true;
            }
            this.pointerScreenX = pointerScreenX;
            this.pointerScreenY = pointerScreenY;
            if (!this.isAnimating) {
                this.isAnimating = true;
                this.requestAnimation(getTime());
            }
        }
    };
    AutoScroller.prototype.stop = function () {
        if (this.isEnabled) {
            this.isAnimating = false; // will stop animation
            for (var _i = 0, _a = this.scrollCaches; _i < _a.length; _i++) {
                var scrollCache = _a[_i];
                scrollCache.destroy();
            }
            this.scrollCaches = null;
        }
    };
    AutoScroller.prototype.requestAnimation = function (now) {
        this.msSinceRequest = now;
        requestAnimationFrame(this.animate);
    };
    AutoScroller.prototype.handleSide = function (edge, seconds) {
        var scrollCache = edge.scrollCache;
        var edgeThreshold = this.edgeThreshold;
        var invDistance = edgeThreshold - edge.distance;
        var velocity = // the closer to the edge, the faster we scroll
         (invDistance * invDistance) / (edgeThreshold * edgeThreshold) * // quadratic
            this.maxVelocity * seconds;
        var sign = 1;
        switch (edge.name) {
            case 'left':
                sign = -1;
            // falls through
            case 'right':
                scrollCache.setScrollLeft(scrollCache.getScrollLeft() + velocity * sign);
                break;
            case 'top':
                sign = -1;
            // falls through
            case 'bottom':
                scrollCache.setScrollTop(scrollCache.getScrollTop() + velocity * sign);
                break;
        }
    };
    // left/top are relative to document topleft
    AutoScroller.prototype.computeBestEdge = function (left, top) {
        var edgeThreshold = this.edgeThreshold;
        var bestSide = null;
        for (var _i = 0, _a = this.scrollCaches; _i < _a.length; _i++) {
            var scrollCache = _a[_i];
            var rect = scrollCache.clientRect;
            var leftDist = left - rect.left;
            var rightDist = rect.right - left;
            var topDist = top - rect.top;
            var bottomDist = rect.bottom - top;
            // completely within the rect?
            if (leftDist >= 0 && rightDist >= 0 && topDist >= 0 && bottomDist >= 0) {
                if (topDist <= edgeThreshold && this.everMovedUp && scrollCache.canScrollUp() &&
                    (!bestSide || bestSide.distance > topDist)) {
                    bestSide = { scrollCache: scrollCache, name: 'top', distance: topDist };
                }
                if (bottomDist <= edgeThreshold && this.everMovedDown && scrollCache.canScrollDown() &&
                    (!bestSide || bestSide.distance > bottomDist)) {
                    bestSide = { scrollCache: scrollCache, name: 'bottom', distance: bottomDist };
                }
                if (leftDist <= edgeThreshold && this.everMovedLeft && scrollCache.canScrollLeft() &&
                    (!bestSide || bestSide.distance > leftDist)) {
                    bestSide = { scrollCache: scrollCache, name: 'left', distance: leftDist };
                }
                if (rightDist <= edgeThreshold && this.everMovedRight && scrollCache.canScrollRight() &&
                    (!bestSide || bestSide.distance > rightDist)) {
                    bestSide = { scrollCache: scrollCache, name: 'right', distance: rightDist };
                }
            }
        }
        return bestSide;
    };
    AutoScroller.prototype.buildCaches = function () {
        return this.queryScrollEls().map(function (el) {
            if (el === window) {
                return new WindowScrollGeomCache(false); // false = don't listen to user-generated scrolls
            }
            else {
                return new ElementScrollGeomCache(el, false); // false = don't listen to user-generated scrolls
            }
        });
    };
    AutoScroller.prototype.queryScrollEls = function () {
        var els = [];
        for (var _i = 0, _a = this.scrollQuery; _i < _a.length; _i++) {
            var query = _a[_i];
            if (typeof query === 'object') {
                els.push(query);
            }
            else {
                els.push.apply(els, Array.prototype.slice.call(document.querySelectorAll(query)));
            }
        }
        return els;
    };
    return AutoScroller;
}());

/*
Monitors dragging on an element. Has a number of high-level features:
- minimum distance required before dragging
- minimum wait time ("delay") before dragging
- a mirror element that follows the pointer
*/
var FeaturefulElementDragging = /** @class */ (function (_super) {
    __extends(FeaturefulElementDragging, _super);
    function FeaturefulElementDragging(containerEl) {
        var _this = _super.call(this, containerEl) || this;
        // options that can be directly set by caller
        // the caller can also set the PointerDragging's options as well
        _this.delay = null;
        _this.minDistance = 0;
        _this.touchScrollAllowed = true; // prevents drag from starting and blocks scrolling during drag
        _this.mirrorNeedsRevert = false;
        _this.isInteracting = false; // is the user validly moving the pointer? lasts until pointerup
        _this.isDragging = false; // is it INTENTFULLY dragging? lasts until after revert animation
        _this.isDelayEnded = false;
        _this.isDistanceSurpassed = false;
        _this.delayTimeoutId = null;
        _this.onPointerDown = function (ev) {
            if (!_this.isDragging) { // so new drag doesn't happen while revert animation is going
                _this.isInteracting = true;
                _this.isDelayEnded = false;
                _this.isDistanceSurpassed = false;
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["preventSelection"])(document.body);
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["preventContextMenu"])(document.body);
                // prevent links from being visited if there's an eventual drag.
                // also prevents selection in older browsers (maybe?).
                // not necessary for touch, besides, browser would complain about passiveness.
                if (!ev.isTouch) {
                    ev.origEvent.preventDefault();
                }
                _this.emitter.trigger('pointerdown', ev);
                if (!_this.pointer.shouldIgnoreMove) {
                    // actions related to initiating dragstart+dragmove+dragend...
                    _this.mirror.setIsVisible(false); // reset. caller must set-visible
                    _this.mirror.start(ev.subjectEl, ev.pageX, ev.pageY); // must happen on first pointer down
                    _this.startDelay(ev);
                    if (!_this.minDistance) {
                        _this.handleDistanceSurpassed(ev);
                    }
                }
            }
        };
        _this.onPointerMove = function (ev) {
            if (_this.isInteracting) { // if false, still waiting for previous drag's revert
                _this.emitter.trigger('pointermove', ev);
                if (!_this.isDistanceSurpassed) {
                    var minDistance = _this.minDistance;
                    var distanceSq = void 0; // current distance from the origin, squared
                    var deltaX = ev.deltaX, deltaY = ev.deltaY;
                    distanceSq = deltaX * deltaX + deltaY * deltaY;
                    if (distanceSq >= minDistance * minDistance) { // use pythagorean theorem
                        _this.handleDistanceSurpassed(ev);
                    }
                }
                if (_this.isDragging) {
                    // a real pointer move? (not one simulated by scrolling)
                    if (ev.origEvent.type !== 'scroll') {
                        _this.mirror.handleMove(ev.pageX, ev.pageY);
                        _this.autoScroller.handleMove(ev.pageX, ev.pageY);
                    }
                    _this.emitter.trigger('dragmove', ev);
                }
            }
        };
        _this.onPointerUp = function (ev) {
            if (_this.isInteracting) { // if false, still waiting for previous drag's revert
                _this.isInteracting = false;
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["allowSelection"])(document.body);
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["allowContextMenu"])(document.body);
                _this.emitter.trigger('pointerup', ev); // can potentially set mirrorNeedsRevert
                if (_this.isDragging) {
                    _this.autoScroller.stop();
                    _this.tryStopDrag(ev); // which will stop the mirror
                }
                if (_this.delayTimeoutId) {
                    clearTimeout(_this.delayTimeoutId);
                    _this.delayTimeoutId = null;
                }
            }
        };
        var pointer = _this.pointer = new PointerDragging(containerEl);
        pointer.emitter.on('pointerdown', _this.onPointerDown);
        pointer.emitter.on('pointermove', _this.onPointerMove);
        pointer.emitter.on('pointerup', _this.onPointerUp);
        _this.mirror = new ElementMirror();
        _this.autoScroller = new AutoScroller();
        return _this;
    }
    FeaturefulElementDragging.prototype.destroy = function () {
        this.pointer.destroy();
    };
    FeaturefulElementDragging.prototype.startDelay = function (ev) {
        var _this = this;
        if (typeof this.delay === 'number') {
            this.delayTimeoutId = setTimeout(function () {
                _this.delayTimeoutId = null;
                _this.handleDelayEnd(ev);
            }, this.delay); // not assignable to number!
        }
        else {
            this.handleDelayEnd(ev);
        }
    };
    FeaturefulElementDragging.prototype.handleDelayEnd = function (ev) {
        this.isDelayEnded = true;
        this.tryStartDrag(ev);
    };
    FeaturefulElementDragging.prototype.handleDistanceSurpassed = function (ev) {
        this.isDistanceSurpassed = true;
        this.tryStartDrag(ev);
    };
    FeaturefulElementDragging.prototype.tryStartDrag = function (ev) {
        if (this.isDelayEnded && this.isDistanceSurpassed) {
            if (!this.pointer.wasTouchScroll || this.touchScrollAllowed) {
                this.isDragging = true;
                this.mirrorNeedsRevert = false;
                this.autoScroller.start(ev.pageX, ev.pageY);
                this.emitter.trigger('dragstart', ev);
                if (this.touchScrollAllowed === false) {
                    this.pointer.cancelTouchScroll();
                }
            }
        }
    };
    FeaturefulElementDragging.prototype.tryStopDrag = function (ev) {
        // .stop() is ALWAYS asynchronous, which we NEED because we want all pointerup events
        // that come from the document to fire beforehand. much more convenient this way.
        this.mirror.stop(this.mirrorNeedsRevert, this.stopDrag.bind(this, ev) // bound with args
        );
    };
    FeaturefulElementDragging.prototype.stopDrag = function (ev) {
        this.isDragging = false;
        this.emitter.trigger('dragend', ev);
    };
    // fill in the implementations...
    FeaturefulElementDragging.prototype.setIgnoreMove = function (bool) {
        this.pointer.shouldIgnoreMove = bool;
    };
    FeaturefulElementDragging.prototype.setMirrorIsVisible = function (bool) {
        this.mirror.setIsVisible(bool);
    };
    FeaturefulElementDragging.prototype.setMirrorNeedsRevert = function (bool) {
        this.mirrorNeedsRevert = bool;
    };
    FeaturefulElementDragging.prototype.setAutoScrollEnabled = function (bool) {
        this.autoScroller.isEnabled = bool;
    };
    return FeaturefulElementDragging;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["ElementDragging"]));

/*
When this class is instantiated, it records the offset of an element (relative to the document topleft),
and continues to monitor scrolling, updating the cached coordinates if it needs to.
Does not access the DOM after instantiation, so highly performant.

Also keeps track of all scrolling/overflow:hidden containers that are parents of the given element
and an determine if a given point is inside the combined clipping rectangle.
*/
var OffsetTracker = /** @class */ (function () {
    function OffsetTracker(el) {
        this.origRect = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["computeRect"])(el);
        // will work fine for divs that have overflow:hidden
        this.scrollCaches = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["getClippingParents"])(el).map(function (el) {
            return new ElementScrollGeomCache(el, true); // listen=true
        });
    }
    OffsetTracker.prototype.destroy = function () {
        for (var _i = 0, _a = this.scrollCaches; _i < _a.length; _i++) {
            var scrollCache = _a[_i];
            scrollCache.destroy();
        }
    };
    OffsetTracker.prototype.computeLeft = function () {
        var left = this.origRect.left;
        for (var _i = 0, _a = this.scrollCaches; _i < _a.length; _i++) {
            var scrollCache = _a[_i];
            left += scrollCache.origScrollLeft - scrollCache.getScrollLeft();
        }
        return left;
    };
    OffsetTracker.prototype.computeTop = function () {
        var top = this.origRect.top;
        for (var _i = 0, _a = this.scrollCaches; _i < _a.length; _i++) {
            var scrollCache = _a[_i];
            top += scrollCache.origScrollTop - scrollCache.getScrollTop();
        }
        return top;
    };
    OffsetTracker.prototype.isWithinClipping = function (pageX, pageY) {
        var point = { left: pageX, top: pageY };
        for (var _i = 0, _a = this.scrollCaches; _i < _a.length; _i++) {
            var scrollCache = _a[_i];
            if (!isIgnoredClipping(scrollCache.getEventTarget()) &&
                !Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["pointInsideRect"])(point, scrollCache.clientRect)) {
                return false;
            }
        }
        return true;
    };
    return OffsetTracker;
}());
// certain clipping containers should never constrain interactions, like <html> and <body>
// https://github.com/fullcalendar/fullcalendar/issues/3615
function isIgnoredClipping(node) {
    var tagName = node.tagName;
    return tagName === 'HTML' || tagName === 'BODY';
}

/*
Tracks movement over multiple droppable areas (aka "hits")
that exist in one or more DateComponents.
Relies on an existing draggable.

emits:
- pointerdown
- dragstart
- hitchange - fires initially, even if not over a hit
- pointerup
- (hitchange - again, to null, if ended over a hit)
- dragend
*/
var HitDragging = /** @class */ (function () {
    function HitDragging(dragging, droppableStore) {
        var _this = this;
        // options that can be set by caller
        this.useSubjectCenter = false;
        this.requireInitial = true; // if doesn't start out on a hit, won't emit any events
        this.initialHit = null;
        this.movingHit = null;
        this.finalHit = null; // won't ever be populated if shouldIgnoreMove
        this.handlePointerDown = function (ev) {
            var dragging = _this.dragging;
            _this.initialHit = null;
            _this.movingHit = null;
            _this.finalHit = null;
            _this.prepareHits();
            _this.processFirstCoord(ev);
            if (_this.initialHit || !_this.requireInitial) {
                dragging.setIgnoreMove(false);
                _this.emitter.trigger('pointerdown', ev); // TODO: fire this before computing processFirstCoord, so listeners can cancel. this gets fired by almost every handler :(
            }
            else {
                dragging.setIgnoreMove(true);
            }
        };
        this.handleDragStart = function (ev) {
            _this.emitter.trigger('dragstart', ev);
            _this.handleMove(ev, true); // force = fire even if initially null
        };
        this.handleDragMove = function (ev) {
            _this.emitter.trigger('dragmove', ev);
            _this.handleMove(ev);
        };
        this.handlePointerUp = function (ev) {
            _this.releaseHits();
            _this.emitter.trigger('pointerup', ev);
        };
        this.handleDragEnd = function (ev) {
            if (_this.movingHit) {
                _this.emitter.trigger('hitupdate', null, true, ev);
            }
            _this.finalHit = _this.movingHit;
            _this.movingHit = null;
            _this.emitter.trigger('dragend', ev);
        };
        this.droppableStore = droppableStore;
        dragging.emitter.on('pointerdown', this.handlePointerDown);
        dragging.emitter.on('dragstart', this.handleDragStart);
        dragging.emitter.on('dragmove', this.handleDragMove);
        dragging.emitter.on('pointerup', this.handlePointerUp);
        dragging.emitter.on('dragend', this.handleDragEnd);
        this.dragging = dragging;
        this.emitter = new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["EmitterMixin"]();
    }
    // sets initialHit
    // sets coordAdjust
    HitDragging.prototype.processFirstCoord = function (ev) {
        var origPoint = { left: ev.pageX, top: ev.pageY };
        var adjustedPoint = origPoint;
        var subjectEl = ev.subjectEl;
        var subjectRect;
        if (subjectEl !== document) {
            subjectRect = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["computeRect"])(subjectEl);
            adjustedPoint = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["constrainPoint"])(adjustedPoint, subjectRect);
        }
        var initialHit = this.initialHit = this.queryHitForOffset(adjustedPoint.left, adjustedPoint.top);
        if (initialHit) {
            if (this.useSubjectCenter && subjectRect) {
                var slicedSubjectRect = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["intersectRects"])(subjectRect, initialHit.rect);
                if (slicedSubjectRect) {
                    adjustedPoint = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["getRectCenter"])(slicedSubjectRect);
                }
            }
            this.coordAdjust = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["diffPoints"])(adjustedPoint, origPoint);
        }
        else {
            this.coordAdjust = { left: 0, top: 0 };
        }
    };
    HitDragging.prototype.handleMove = function (ev, forceHandle) {
        var hit = this.queryHitForOffset(ev.pageX + this.coordAdjust.left, ev.pageY + this.coordAdjust.top);
        if (forceHandle || !isHitsEqual(this.movingHit, hit)) {
            this.movingHit = hit;
            this.emitter.trigger('hitupdate', hit, false, ev);
        }
    };
    HitDragging.prototype.prepareHits = function () {
        this.offsetTrackers = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["mapHash"])(this.droppableStore, function (interactionSettings) {
            interactionSettings.component.buildPositionCaches();
            return new OffsetTracker(interactionSettings.el);
        });
    };
    HitDragging.prototype.releaseHits = function () {
        var offsetTrackers = this.offsetTrackers;
        for (var id in offsetTrackers) {
            offsetTrackers[id].destroy();
        }
        this.offsetTrackers = {};
    };
    HitDragging.prototype.queryHitForOffset = function (offsetLeft, offsetTop) {
        var _a = this, droppableStore = _a.droppableStore, offsetTrackers = _a.offsetTrackers;
        var bestHit = null;
        for (var id in droppableStore) {
            var component = droppableStore[id].component;
            var offsetTracker = offsetTrackers[id];
            if (offsetTracker.isWithinClipping(offsetLeft, offsetTop)) {
                var originLeft = offsetTracker.computeLeft();
                var originTop = offsetTracker.computeTop();
                var positionLeft = offsetLeft - originLeft;
                var positionTop = offsetTop - originTop;
                var origRect = offsetTracker.origRect;
                var width = origRect.right - origRect.left;
                var height = origRect.bottom - origRect.top;
                if (
                // must be within the element's bounds
                positionLeft >= 0 && positionLeft < width &&
                    positionTop >= 0 && positionTop < height) {
                    var hit = component.queryHit(positionLeft, positionTop, width, height);
                    if (hit &&
                        (
                        // make sure the hit is within activeRange, meaning it's not a deal cell
                        !component.props.dateProfile || // hack for DayTile
                            Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["rangeContainsRange"])(component.props.dateProfile.activeRange, hit.dateSpan.range)) &&
                        (!bestHit || hit.layer > bestHit.layer)) {
                        // TODO: better way to re-orient rectangle
                        hit.rect.left += originLeft;
                        hit.rect.right += originLeft;
                        hit.rect.top += originTop;
                        hit.rect.bottom += originTop;
                        bestHit = hit;
                    }
                }
            }
        }
        return bestHit;
    };
    return HitDragging;
}());
function isHitsEqual(hit0, hit1) {
    if (!hit0 && !hit1) {
        return true;
    }
    if (Boolean(hit0) !== Boolean(hit1)) {
        return false;
    }
    return Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["isDateSpansEqual"])(hit0.dateSpan, hit1.dateSpan);
}

/*
Monitors when the user clicks on a specific date/time of a component.
A pointerdown+pointerup on the same "hit" constitutes a click.
*/
var DateClicking = /** @class */ (function (_super) {
    __extends(DateClicking, _super);
    function DateClicking(settings) {
        var _this = _super.call(this, settings) || this;
        _this.handlePointerDown = function (ev) {
            var dragging = _this.dragging;
            // do this in pointerdown (not dragend) because DOM might be mutated by the time dragend is fired
            dragging.setIgnoreMove(!_this.component.isValidDateDownEl(dragging.pointer.downEl));
        };
        // won't even fire if moving was ignored
        _this.handleDragEnd = function (ev) {
            var component = _this.component;
            var _a = component.context, calendar = _a.calendar, view = _a.view;
            var pointer = _this.dragging.pointer;
            if (!pointer.wasTouchScroll) {
                var _b = _this.hitDragging, initialHit = _b.initialHit, finalHit = _b.finalHit;
                if (initialHit && finalHit && isHitsEqual(initialHit, finalHit)) {
                    calendar.triggerDateClick(initialHit.dateSpan, initialHit.dayEl, view, ev.origEvent);
                }
            }
        };
        var component = settings.component;
        // we DO want to watch pointer moves because otherwise finalHit won't get populated
        _this.dragging = new FeaturefulElementDragging(component.el);
        _this.dragging.autoScroller.isEnabled = false;
        var hitDragging = _this.hitDragging = new HitDragging(_this.dragging, Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["interactionSettingsToStore"])(settings));
        hitDragging.emitter.on('pointerdown', _this.handlePointerDown);
        hitDragging.emitter.on('dragend', _this.handleDragEnd);
        return _this;
    }
    DateClicking.prototype.destroy = function () {
        this.dragging.destroy();
    };
    return DateClicking;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["Interaction"]));

/*
Tracks when the user selects a portion of time of a component,
constituted by a drag over date cells, with a possible delay at the beginning of the drag.
*/
var DateSelecting = /** @class */ (function (_super) {
    __extends(DateSelecting, _super);
    function DateSelecting(settings) {
        var _this = _super.call(this, settings) || this;
        _this.dragSelection = null;
        _this.handlePointerDown = function (ev) {
            var _a = _this, component = _a.component, dragging = _a.dragging;
            var options = component.context.options;
            var canSelect = options.selectable &&
                component.isValidDateDownEl(ev.origEvent.target);
            // don't bother to watch expensive moves if component won't do selection
            dragging.setIgnoreMove(!canSelect);
            // if touch, require user to hold down
            dragging.delay = ev.isTouch ? getComponentTouchDelay(component) : null;
        };
        _this.handleDragStart = function (ev) {
            _this.component.context.calendar.unselect(ev); // unselect previous selections
        };
        _this.handleHitUpdate = function (hit, isFinal) {
            var calendar = _this.component.context.calendar;
            var dragSelection = null;
            var isInvalid = false;
            if (hit) {
                dragSelection = joinHitsIntoSelection(_this.hitDragging.initialHit, hit, calendar.pluginSystem.hooks.dateSelectionTransformers);
                if (!dragSelection || !_this.component.isDateSelectionValid(dragSelection)) {
                    isInvalid = true;
                    dragSelection = null;
                }
            }
            if (dragSelection) {
                calendar.dispatch({ type: 'SELECT_DATES', selection: dragSelection });
            }
            else if (!isFinal) { // only unselect if moved away while dragging
                calendar.dispatch({ type: 'UNSELECT_DATES' });
            }
            if (!isInvalid) {
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["enableCursor"])();
            }
            else {
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["disableCursor"])();
            }
            if (!isFinal) {
                _this.dragSelection = dragSelection; // only clear if moved away from all hits while dragging
            }
        };
        _this.handlePointerUp = function (pev) {
            if (_this.dragSelection) {
                // selection is already rendered, so just need to report selection
                _this.component.context.calendar.triggerDateSelect(_this.dragSelection, pev);
                _this.dragSelection = null;
            }
        };
        var component = settings.component;
        var options = component.context.options;
        var dragging = _this.dragging = new FeaturefulElementDragging(component.el);
        dragging.touchScrollAllowed = false;
        dragging.minDistance = options.selectMinDistance || 0;
        dragging.autoScroller.isEnabled = options.dragScroll;
        var hitDragging = _this.hitDragging = new HitDragging(_this.dragging, Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["interactionSettingsToStore"])(settings));
        hitDragging.emitter.on('pointerdown', _this.handlePointerDown);
        hitDragging.emitter.on('dragstart', _this.handleDragStart);
        hitDragging.emitter.on('hitupdate', _this.handleHitUpdate);
        hitDragging.emitter.on('pointerup', _this.handlePointerUp);
        return _this;
    }
    DateSelecting.prototype.destroy = function () {
        this.dragging.destroy();
    };
    return DateSelecting;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["Interaction"]));
function getComponentTouchDelay(component) {
    var options = component.context.options;
    var delay = options.selectLongPressDelay;
    if (delay == null) {
        delay = options.longPressDelay;
    }
    return delay;
}
function joinHitsIntoSelection(hit0, hit1, dateSelectionTransformers) {
    var dateSpan0 = hit0.dateSpan;
    var dateSpan1 = hit1.dateSpan;
    var ms = [
        dateSpan0.range.start,
        dateSpan0.range.end,
        dateSpan1.range.start,
        dateSpan1.range.end
    ];
    ms.sort(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["compareNumbers"]);
    var props = {};
    for (var _i = 0, dateSelectionTransformers_1 = dateSelectionTransformers; _i < dateSelectionTransformers_1.length; _i++) {
        var transformer = dateSelectionTransformers_1[_i];
        var res = transformer(hit0, hit1);
        if (res === false) {
            return null;
        }
        else if (res) {
            __assign(props, res);
        }
    }
    props.range = { start: ms[0], end: ms[3] };
    props.allDay = dateSpan0.allDay;
    return props;
}

var EventDragging = /** @class */ (function (_super) {
    __extends(EventDragging, _super);
    function EventDragging(settings) {
        var _this = _super.call(this, settings) || this;
        // internal state
        _this.subjectSeg = null; // the seg being selected/dragged
        _this.isDragging = false;
        _this.eventRange = null;
        _this.relevantEvents = null; // the events being dragged
        _this.receivingCalendar = null;
        _this.validMutation = null;
        _this.mutatedRelevantEvents = null;
        _this.handlePointerDown = function (ev) {
            var origTarget = ev.origEvent.target;
            var _a = _this, component = _a.component, dragging = _a.dragging;
            var mirror = dragging.mirror;
            var options = component.context.options;
            var initialCalendar = component.context.calendar;
            var subjectSeg = _this.subjectSeg = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["getElSeg"])(ev.subjectEl);
            var eventRange = _this.eventRange = subjectSeg.eventRange;
            var eventInstanceId = eventRange.instance.instanceId;
            _this.relevantEvents = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["getRelevantEvents"])(initialCalendar.state.eventStore, eventInstanceId);
            dragging.minDistance = ev.isTouch ? 0 : options.eventDragMinDistance;
            dragging.delay =
                // only do a touch delay if touch and this event hasn't been selected yet
                (ev.isTouch && eventInstanceId !== component.props.eventSelection) ?
                    getComponentTouchDelay$1(component) :
                    null;
            mirror.parentNode = initialCalendar.el;
            mirror.revertDuration = options.dragRevertDuration;
            var isValid = component.isValidSegDownEl(origTarget) &&
                !Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["elementClosest"])(origTarget, '.fc-resizer'); // NOT on a resizer
            dragging.setIgnoreMove(!isValid);
            // disable dragging for elements that are resizable (ie, selectable)
            // but are not draggable
            _this.isDragging = isValid &&
                ev.subjectEl.classList.contains('fc-draggable');
        };
        _this.handleDragStart = function (ev) {
            var context = _this.component.context;
            var initialCalendar = context.calendar;
            var eventRange = _this.eventRange;
            var eventInstanceId = eventRange.instance.instanceId;
            if (ev.isTouch) {
                // need to select a different event?
                if (eventInstanceId !== _this.component.props.eventSelection) {
                    initialCalendar.dispatch({ type: 'SELECT_EVENT', eventInstanceId: eventInstanceId });
                }
            }
            else {
                // if now using mouse, but was previous touch interaction, clear selected event
                initialCalendar.dispatch({ type: 'UNSELECT_EVENT' });
            }
            if (_this.isDragging) {
                initialCalendar.unselect(ev); // unselect *date* selection
                initialCalendar.publiclyTrigger('eventDragStart', [
                    {
                        el: _this.subjectSeg.el,
                        event: new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["EventApi"](initialCalendar, eventRange.def, eventRange.instance),
                        jsEvent: ev.origEvent,
                        view: context.view
                    }
                ]);
            }
        };
        _this.handleHitUpdate = function (hit, isFinal) {
            if (!_this.isDragging) {
                return;
            }
            var relevantEvents = _this.relevantEvents;
            var initialHit = _this.hitDragging.initialHit;
            var initialCalendar = _this.component.context.calendar;
            // states based on new hit
            var receivingCalendar = null;
            var mutation = null;
            var mutatedRelevantEvents = null;
            var isInvalid = false;
            var interaction = {
                affectedEvents: relevantEvents,
                mutatedEvents: Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createEmptyEventStore"])(),
                isEvent: true,
                origSeg: _this.subjectSeg
            };
            if (hit) {
                var receivingComponent = hit.component;
                receivingCalendar = receivingComponent.context.calendar;
                var receivingOptions = receivingComponent.context.options;
                if (initialCalendar === receivingCalendar ||
                    receivingOptions.editable && receivingOptions.droppable) {
                    mutation = computeEventMutation(initialHit, hit, receivingCalendar.pluginSystem.hooks.eventDragMutationMassagers);
                    if (mutation) {
                        mutatedRelevantEvents = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["applyMutationToEventStore"])(relevantEvents, receivingCalendar.eventUiBases, mutation, receivingCalendar);
                        interaction.mutatedEvents = mutatedRelevantEvents;
                        if (!receivingComponent.isInteractionValid(interaction)) {
                            isInvalid = true;
                            mutation = null;
                            mutatedRelevantEvents = null;
                            interaction.mutatedEvents = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createEmptyEventStore"])();
                        }
                    }
                }
                else {
                    receivingCalendar = null;
                }
            }
            _this.displayDrag(receivingCalendar, interaction);
            if (!isInvalid) {
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["enableCursor"])();
            }
            else {
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["disableCursor"])();
            }
            if (!isFinal) {
                if (initialCalendar === receivingCalendar && // TODO: write test for this
                    isHitsEqual(initialHit, hit)) {
                    mutation = null;
                }
                _this.dragging.setMirrorNeedsRevert(!mutation);
                // render the mirror if no already-rendered mirror
                // TODO: wish we could somehow wait for dispatch to guarantee render
                _this.dragging.setMirrorIsVisible(!hit || !document.querySelector('.fc-mirror'));
                // assign states based on new hit
                _this.receivingCalendar = receivingCalendar;
                _this.validMutation = mutation;
                _this.mutatedRelevantEvents = mutatedRelevantEvents;
            }
        };
        _this.handlePointerUp = function () {
            if (!_this.isDragging) {
                _this.cleanup(); // because handleDragEnd won't fire
            }
        };
        _this.handleDragEnd = function (ev) {
            if (_this.isDragging) {
                var context = _this.component.context;
                var initialCalendar_1 = context.calendar;
                var initialView = context.view;
                var _a = _this, receivingCalendar = _a.receivingCalendar, validMutation = _a.validMutation;
                var eventDef = _this.eventRange.def;
                var eventInstance = _this.eventRange.instance;
                var eventApi = new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["EventApi"](initialCalendar_1, eventDef, eventInstance);
                var relevantEvents_1 = _this.relevantEvents;
                var mutatedRelevantEvents = _this.mutatedRelevantEvents;
                var finalHit = _this.hitDragging.finalHit;
                _this.clearDrag(); // must happen after revert animation
                initialCalendar_1.publiclyTrigger('eventDragStop', [
                    {
                        el: _this.subjectSeg.el,
                        event: eventApi,
                        jsEvent: ev.origEvent,
                        view: initialView
                    }
                ]);
                if (validMutation) {
                    // dropped within same calendar
                    if (receivingCalendar === initialCalendar_1) {
                        initialCalendar_1.dispatch({
                            type: 'MERGE_EVENTS',
                            eventStore: mutatedRelevantEvents
                        });
                        var transformed = {};
                        for (var _i = 0, _b = initialCalendar_1.pluginSystem.hooks.eventDropTransformers; _i < _b.length; _i++) {
                            var transformer = _b[_i];
                            __assign(transformed, transformer(validMutation, initialCalendar_1));
                        }
                        var eventDropArg = __assign({}, transformed, { el: ev.subjectEl, delta: validMutation.datesDelta, oldEvent: eventApi, event: new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["EventApi"](// the data AFTER the mutation
                            initialCalendar_1, mutatedRelevantEvents.defs[eventDef.defId], eventInstance ? mutatedRelevantEvents.instances[eventInstance.instanceId] : null), revert: function () {
                                initialCalendar_1.dispatch({
                                    type: 'MERGE_EVENTS',
                                    eventStore: relevantEvents_1
                                });
                            }, jsEvent: ev.origEvent, view: initialView });
                        initialCalendar_1.publiclyTrigger('eventDrop', [eventDropArg]);
                        // dropped in different calendar
                    }
                    else if (receivingCalendar) {
                        initialCalendar_1.publiclyTrigger('eventLeave', [
                            {
                                draggedEl: ev.subjectEl,
                                event: eventApi,
                                view: initialView
                            }
                        ]);
                        initialCalendar_1.dispatch({
                            type: 'REMOVE_EVENT_INSTANCES',
                            instances: _this.mutatedRelevantEvents.instances
                        });
                        receivingCalendar.dispatch({
                            type: 'MERGE_EVENTS',
                            eventStore: _this.mutatedRelevantEvents
                        });
                        if (ev.isTouch) {
                            receivingCalendar.dispatch({
                                type: 'SELECT_EVENT',
                                eventInstanceId: eventInstance.instanceId
                            });
                        }
                        var dropArg = __assign({}, receivingCalendar.buildDatePointApi(finalHit.dateSpan), { draggedEl: ev.subjectEl, jsEvent: ev.origEvent, view: finalHit.component // should this be finalHit.component.view? See #4644
                         });
                        receivingCalendar.publiclyTrigger('drop', [dropArg]);
                        receivingCalendar.publiclyTrigger('eventReceive', [
                            {
                                draggedEl: ev.subjectEl,
                                event: new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["EventApi"](// the data AFTER the mutation
                                receivingCalendar, mutatedRelevantEvents.defs[eventDef.defId], mutatedRelevantEvents.instances[eventInstance.instanceId]),
                                view: finalHit.component // should this be finalHit.component.view? See #4644
                            }
                        ]);
                    }
                }
                else {
                    initialCalendar_1.publiclyTrigger('_noEventDrop');
                }
            }
            _this.cleanup();
        };
        var component = _this.component;
        var options = component.context.options;
        var dragging = _this.dragging = new FeaturefulElementDragging(component.el);
        dragging.pointer.selector = EventDragging.SELECTOR;
        dragging.touchScrollAllowed = false;
        dragging.autoScroller.isEnabled = options.dragScroll;
        var hitDragging = _this.hitDragging = new HitDragging(_this.dragging, _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["interactionSettingsStore"]);
        hitDragging.useSubjectCenter = settings.useEventCenter;
        hitDragging.emitter.on('pointerdown', _this.handlePointerDown);
        hitDragging.emitter.on('dragstart', _this.handleDragStart);
        hitDragging.emitter.on('hitupdate', _this.handleHitUpdate);
        hitDragging.emitter.on('pointerup', _this.handlePointerUp);
        hitDragging.emitter.on('dragend', _this.handleDragEnd);
        return _this;
    }
    EventDragging.prototype.destroy = function () {
        this.dragging.destroy();
    };
    // render a drag state on the next receivingCalendar
    EventDragging.prototype.displayDrag = function (nextCalendar, state) {
        var initialCalendar = this.component.context.calendar;
        var prevCalendar = this.receivingCalendar;
        // does the previous calendar need to be cleared?
        if (prevCalendar && prevCalendar !== nextCalendar) {
            // does the initial calendar need to be cleared?
            // if so, don't clear all the way. we still need to to hide the affectedEvents
            if (prevCalendar === initialCalendar) {
                prevCalendar.dispatch({
                    type: 'SET_EVENT_DRAG',
                    state: {
                        affectedEvents: state.affectedEvents,
                        mutatedEvents: Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createEmptyEventStore"])(),
                        isEvent: true,
                        origSeg: state.origSeg
                    }
                });
                // completely clear the old calendar if it wasn't the initial
            }
            else {
                prevCalendar.dispatch({ type: 'UNSET_EVENT_DRAG' });
            }
        }
        if (nextCalendar) {
            nextCalendar.dispatch({ type: 'SET_EVENT_DRAG', state: state });
        }
    };
    EventDragging.prototype.clearDrag = function () {
        var initialCalendar = this.component.context.calendar;
        var receivingCalendar = this.receivingCalendar;
        if (receivingCalendar) {
            receivingCalendar.dispatch({ type: 'UNSET_EVENT_DRAG' });
        }
        // the initial calendar might have an dummy drag state from displayDrag
        if (initialCalendar !== receivingCalendar) {
            initialCalendar.dispatch({ type: 'UNSET_EVENT_DRAG' });
        }
    };
    EventDragging.prototype.cleanup = function () {
        this.subjectSeg = null;
        this.isDragging = false;
        this.eventRange = null;
        this.relevantEvents = null;
        this.receivingCalendar = null;
        this.validMutation = null;
        this.mutatedRelevantEvents = null;
    };
    EventDragging.SELECTOR = '.fc-draggable, .fc-resizable'; // TODO: test this in IE11
    return EventDragging;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["Interaction"]));
function computeEventMutation(hit0, hit1, massagers) {
    var dateSpan0 = hit0.dateSpan;
    var dateSpan1 = hit1.dateSpan;
    var date0 = dateSpan0.range.start;
    var date1 = dateSpan1.range.start;
    var standardProps = {};
    if (dateSpan0.allDay !== dateSpan1.allDay) {
        standardProps.allDay = dateSpan1.allDay;
        standardProps.hasEnd = hit1.component.context.options.allDayMaintainDuration;
        if (dateSpan1.allDay) {
            // means date1 is already start-of-day,
            // but date0 needs to be converted
            date0 = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["startOfDay"])(date0);
        }
    }
    var delta = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["diffDates"])(date0, date1, hit0.component.context.dateEnv, hit0.component === hit1.component ?
        hit0.component.largeUnit :
        null);
    if (delta.milliseconds) { // has hours/minutes/seconds
        standardProps.allDay = false;
    }
    var mutation = {
        datesDelta: delta,
        standardProps: standardProps
    };
    for (var _i = 0, massagers_1 = massagers; _i < massagers_1.length; _i++) {
        var massager = massagers_1[_i];
        massager(mutation, hit0, hit1);
    }
    return mutation;
}
function getComponentTouchDelay$1(component) {
    var options = component.context.options;
    var delay = options.eventLongPressDelay;
    if (delay == null) {
        delay = options.longPressDelay;
    }
    return delay;
}

var EventDragging$1 = /** @class */ (function (_super) {
    __extends(EventDragging, _super);
    function EventDragging(settings) {
        var _this = _super.call(this, settings) || this;
        // internal state
        _this.draggingSeg = null; // TODO: rename to resizingSeg? subjectSeg?
        _this.eventRange = null;
        _this.relevantEvents = null;
        _this.validMutation = null;
        _this.mutatedRelevantEvents = null;
        _this.handlePointerDown = function (ev) {
            var component = _this.component;
            var seg = _this.querySeg(ev);
            var eventRange = _this.eventRange = seg.eventRange;
            _this.dragging.minDistance = component.context.options.eventDragMinDistance;
            // if touch, need to be working with a selected event
            _this.dragging.setIgnoreMove(!_this.component.isValidSegDownEl(ev.origEvent.target) ||
                (ev.isTouch && _this.component.props.eventSelection !== eventRange.instance.instanceId));
        };
        _this.handleDragStart = function (ev) {
            var _a = _this.component.context, calendar = _a.calendar, view = _a.view;
            var eventRange = _this.eventRange;
            _this.relevantEvents = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["getRelevantEvents"])(calendar.state.eventStore, _this.eventRange.instance.instanceId);
            _this.draggingSeg = _this.querySeg(ev);
            calendar.unselect();
            calendar.publiclyTrigger('eventResizeStart', [
                {
                    el: _this.draggingSeg.el,
                    event: new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["EventApi"](calendar, eventRange.def, eventRange.instance),
                    jsEvent: ev.origEvent,
                    view: view
                }
            ]);
        };
        _this.handleHitUpdate = function (hit, isFinal, ev) {
            var calendar = _this.component.context.calendar;
            var relevantEvents = _this.relevantEvents;
            var initialHit = _this.hitDragging.initialHit;
            var eventInstance = _this.eventRange.instance;
            var mutation = null;
            var mutatedRelevantEvents = null;
            var isInvalid = false;
            var interaction = {
                affectedEvents: relevantEvents,
                mutatedEvents: Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createEmptyEventStore"])(),
                isEvent: true,
                origSeg: _this.draggingSeg
            };
            if (hit) {
                mutation = computeMutation(initialHit, hit, ev.subjectEl.classList.contains('fc-start-resizer'), eventInstance.range, calendar.pluginSystem.hooks.eventResizeJoinTransforms);
            }
            if (mutation) {
                mutatedRelevantEvents = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["applyMutationToEventStore"])(relevantEvents, calendar.eventUiBases, mutation, calendar);
                interaction.mutatedEvents = mutatedRelevantEvents;
                if (!_this.component.isInteractionValid(interaction)) {
                    isInvalid = true;
                    mutation = null;
                    mutatedRelevantEvents = null;
                    interaction.mutatedEvents = null;
                }
            }
            if (mutatedRelevantEvents) {
                calendar.dispatch({
                    type: 'SET_EVENT_RESIZE',
                    state: interaction
                });
            }
            else {
                calendar.dispatch({ type: 'UNSET_EVENT_RESIZE' });
            }
            if (!isInvalid) {
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["enableCursor"])();
            }
            else {
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["disableCursor"])();
            }
            if (!isFinal) {
                if (mutation && isHitsEqual(initialHit, hit)) {
                    mutation = null;
                }
                _this.validMutation = mutation;
                _this.mutatedRelevantEvents = mutatedRelevantEvents;
            }
        };
        _this.handleDragEnd = function (ev) {
            var _a = _this.component.context, calendar = _a.calendar, view = _a.view;
            var eventDef = _this.eventRange.def;
            var eventInstance = _this.eventRange.instance;
            var eventApi = new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["EventApi"](calendar, eventDef, eventInstance);
            var relevantEvents = _this.relevantEvents;
            var mutatedRelevantEvents = _this.mutatedRelevantEvents;
            calendar.publiclyTrigger('eventResizeStop', [
                {
                    el: _this.draggingSeg.el,
                    event: eventApi,
                    jsEvent: ev.origEvent,
                    view: view
                }
            ]);
            if (_this.validMutation) {
                calendar.dispatch({
                    type: 'MERGE_EVENTS',
                    eventStore: mutatedRelevantEvents
                });
                calendar.publiclyTrigger('eventResize', [
                    {
                        el: _this.draggingSeg.el,
                        startDelta: _this.validMutation.startDelta || Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createDuration"])(0),
                        endDelta: _this.validMutation.endDelta || Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createDuration"])(0),
                        prevEvent: eventApi,
                        event: new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["EventApi"](// the data AFTER the mutation
                        calendar, mutatedRelevantEvents.defs[eventDef.defId], eventInstance ? mutatedRelevantEvents.instances[eventInstance.instanceId] : null),
                        revert: function () {
                            calendar.dispatch({
                                type: 'MERGE_EVENTS',
                                eventStore: relevantEvents
                            });
                        },
                        jsEvent: ev.origEvent,
                        view: view
                    }
                ]);
            }
            else {
                calendar.publiclyTrigger('_noEventResize');
            }
            // reset all internal state
            _this.draggingSeg = null;
            _this.relevantEvents = null;
            _this.validMutation = null;
            // okay to keep eventInstance around. useful to set it in handlePointerDown
        };
        var component = settings.component;
        var dragging = _this.dragging = new FeaturefulElementDragging(component.el);
        dragging.pointer.selector = '.fc-resizer';
        dragging.touchScrollAllowed = false;
        dragging.autoScroller.isEnabled = component.context.options.dragScroll;
        var hitDragging = _this.hitDragging = new HitDragging(_this.dragging, Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["interactionSettingsToStore"])(settings));
        hitDragging.emitter.on('pointerdown', _this.handlePointerDown);
        hitDragging.emitter.on('dragstart', _this.handleDragStart);
        hitDragging.emitter.on('hitupdate', _this.handleHitUpdate);
        hitDragging.emitter.on('dragend', _this.handleDragEnd);
        return _this;
    }
    EventDragging.prototype.destroy = function () {
        this.dragging.destroy();
    };
    EventDragging.prototype.querySeg = function (ev) {
        return Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["getElSeg"])(Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["elementClosest"])(ev.subjectEl, this.component.fgSegSelector));
    };
    return EventDragging;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["Interaction"]));
function computeMutation(hit0, hit1, isFromStart, instanceRange, transforms) {
    var dateEnv = hit0.component.context.dateEnv;
    var date0 = hit0.dateSpan.range.start;
    var date1 = hit1.dateSpan.range.start;
    var delta = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["diffDates"])(date0, date1, dateEnv, hit0.component.largeUnit);
    var props = {};
    for (var _i = 0, transforms_1 = transforms; _i < transforms_1.length; _i++) {
        var transform = transforms_1[_i];
        var res = transform(hit0, hit1);
        if (res === false) {
            return null;
        }
        else if (res) {
            __assign(props, res);
        }
    }
    if (isFromStart) {
        if (dateEnv.add(instanceRange.start, delta) < instanceRange.end) {
            props.startDelta = delta;
            return props;
        }
    }
    else {
        if (dateEnv.add(instanceRange.end, delta) > instanceRange.start) {
            props.endDelta = delta;
            return props;
        }
    }
    return null;
}

var UnselectAuto = /** @class */ (function () {
    function UnselectAuto(calendar) {
        var _this = this;
        this.isRecentPointerDateSelect = false; // wish we could use a selector to detect date selection, but uses hit system
        this.onSelect = function (selectInfo) {
            if (selectInfo.jsEvent) {
                _this.isRecentPointerDateSelect = true;
            }
        };
        this.onDocumentPointerUp = function (pev) {
            var _a = _this, calendar = _a.calendar, documentPointer = _a.documentPointer;
            var state = calendar.state;
            // touch-scrolling should never unfocus any type of selection
            if (!documentPointer.wasTouchScroll) {
                if (state.dateSelection && // an existing date selection?
                    !_this.isRecentPointerDateSelect // a new pointer-initiated date selection since last onDocumentPointerUp?
                ) {
                    var unselectAuto = calendar.viewOpt('unselectAuto');
                    var unselectCancel = calendar.viewOpt('unselectCancel');
                    if (unselectAuto && (!unselectAuto || !Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["elementClosest"])(documentPointer.downEl, unselectCancel))) {
                        calendar.unselect(pev);
                    }
                }
                if (state.eventSelection && // an existing event selected?
                    !Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["elementClosest"])(documentPointer.downEl, EventDragging.SELECTOR) // interaction DIDN'T start on an event
                ) {
                    calendar.dispatch({ type: 'UNSELECT_EVENT' });
                }
            }
            _this.isRecentPointerDateSelect = false;
        };
        this.calendar = calendar;
        var documentPointer = this.documentPointer = new PointerDragging(document);
        documentPointer.shouldIgnoreMove = true;
        documentPointer.shouldWatchScroll = false;
        documentPointer.emitter.on('pointerup', this.onDocumentPointerUp);
        /*
        TODO: better way to know about whether there was a selection with the pointer
        */
        calendar.on('select', this.onSelect);
    }
    UnselectAuto.prototype.destroy = function () {
        this.calendar.off('select', this.onSelect);
        this.documentPointer.destroy();
    };
    return UnselectAuto;
}());

/*
Given an already instantiated draggable object for one-or-more elements,
Interprets any dragging as an attempt to drag an events that lives outside
of a calendar onto a calendar.
*/
var ExternalElementDragging = /** @class */ (function () {
    function ExternalElementDragging(dragging, suppliedDragMeta) {
        var _this = this;
        this.receivingCalendar = null;
        this.droppableEvent = null; // will exist for all drags, even if create:false
        this.suppliedDragMeta = null;
        this.dragMeta = null;
        this.handleDragStart = function (ev) {
            _this.dragMeta = _this.buildDragMeta(ev.subjectEl);
        };
        this.handleHitUpdate = function (hit, isFinal, ev) {
            var dragging = _this.hitDragging.dragging;
            var receivingCalendar = null;
            var droppableEvent = null;
            var isInvalid = false;
            var interaction = {
                affectedEvents: Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createEmptyEventStore"])(),
                mutatedEvents: Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createEmptyEventStore"])(),
                isEvent: _this.dragMeta.create,
                origSeg: null
            };
            if (hit) {
                receivingCalendar = hit.component.context.calendar;
                if (_this.canDropElOnCalendar(ev.subjectEl, receivingCalendar)) {
                    droppableEvent = computeEventForDateSpan(hit.dateSpan, _this.dragMeta, receivingCalendar);
                    interaction.mutatedEvents = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["eventTupleToStore"])(droppableEvent);
                    isInvalid = !Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["isInteractionValid"])(interaction, receivingCalendar);
                    if (isInvalid) {
                        interaction.mutatedEvents = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createEmptyEventStore"])();
                        droppableEvent = null;
                    }
                }
            }
            _this.displayDrag(receivingCalendar, interaction);
            // show mirror if no already-rendered mirror element OR if we are shutting down the mirror (?)
            // TODO: wish we could somehow wait for dispatch to guarantee render
            dragging.setMirrorIsVisible(isFinal || !droppableEvent || !document.querySelector('.fc-mirror'));
            if (!isInvalid) {
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["enableCursor"])();
            }
            else {
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["disableCursor"])();
            }
            if (!isFinal) {
                dragging.setMirrorNeedsRevert(!droppableEvent);
                _this.receivingCalendar = receivingCalendar;
                _this.droppableEvent = droppableEvent;
            }
        };
        this.handleDragEnd = function (pev) {
            var _a = _this, receivingCalendar = _a.receivingCalendar, droppableEvent = _a.droppableEvent;
            _this.clearDrag();
            if (receivingCalendar && droppableEvent) {
                var finalHit = _this.hitDragging.finalHit;
                var finalView = finalHit.component.context.view;
                var dragMeta = _this.dragMeta;
                var arg = __assign({}, receivingCalendar.buildDatePointApi(finalHit.dateSpan), { draggedEl: pev.subjectEl, jsEvent: pev.origEvent, view: finalView });
                receivingCalendar.publiclyTrigger('drop', [arg]);
                if (dragMeta.create) {
                    receivingCalendar.dispatch({
                        type: 'MERGE_EVENTS',
                        eventStore: Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["eventTupleToStore"])(droppableEvent)
                    });
                    if (pev.isTouch) {
                        receivingCalendar.dispatch({
                            type: 'SELECT_EVENT',
                            eventInstanceId: droppableEvent.instance.instanceId
                        });
                    }
                    // signal that an external event landed
                    receivingCalendar.publiclyTrigger('eventReceive', [
                        {
                            draggedEl: pev.subjectEl,
                            event: new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["EventApi"](receivingCalendar, droppableEvent.def, droppableEvent.instance),
                            view: finalView
                        }
                    ]);
                }
            }
            _this.receivingCalendar = null;
            _this.droppableEvent = null;
        };
        var hitDragging = this.hitDragging = new HitDragging(dragging, _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["interactionSettingsStore"]);
        hitDragging.requireInitial = false; // will start outside of a component
        hitDragging.emitter.on('dragstart', this.handleDragStart);
        hitDragging.emitter.on('hitupdate', this.handleHitUpdate);
        hitDragging.emitter.on('dragend', this.handleDragEnd);
        this.suppliedDragMeta = suppliedDragMeta;
    }
    ExternalElementDragging.prototype.buildDragMeta = function (subjectEl) {
        if (typeof this.suppliedDragMeta === 'object') {
            return Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["parseDragMeta"])(this.suppliedDragMeta);
        }
        else if (typeof this.suppliedDragMeta === 'function') {
            return Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["parseDragMeta"])(this.suppliedDragMeta(subjectEl));
        }
        else {
            return getDragMetaFromEl(subjectEl);
        }
    };
    ExternalElementDragging.prototype.displayDrag = function (nextCalendar, state) {
        var prevCalendar = this.receivingCalendar;
        if (prevCalendar && prevCalendar !== nextCalendar) {
            prevCalendar.dispatch({ type: 'UNSET_EVENT_DRAG' });
        }
        if (nextCalendar) {
            nextCalendar.dispatch({ type: 'SET_EVENT_DRAG', state: state });
        }
    };
    ExternalElementDragging.prototype.clearDrag = function () {
        if (this.receivingCalendar) {
            this.receivingCalendar.dispatch({ type: 'UNSET_EVENT_DRAG' });
        }
    };
    ExternalElementDragging.prototype.canDropElOnCalendar = function (el, receivingCalendar) {
        var dropAccept = receivingCalendar.opt('dropAccept');
        if (typeof dropAccept === 'function') {
            return dropAccept(el);
        }
        else if (typeof dropAccept === 'string' && dropAccept) {
            return Boolean(Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["elementMatches"])(el, dropAccept));
        }
        return true;
    };
    return ExternalElementDragging;
}());
// Utils for computing event store from the DragMeta
// ----------------------------------------------------------------------------------------------------
function computeEventForDateSpan(dateSpan, dragMeta, calendar) {
    var defProps = __assign({}, dragMeta.leftoverProps);
    for (var _i = 0, _a = calendar.pluginSystem.hooks.externalDefTransforms; _i < _a.length; _i++) {
        var transform = _a[_i];
        __assign(defProps, transform(dateSpan, dragMeta));
    }
    var def = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["parseEventDef"])(defProps, dragMeta.sourceId, dateSpan.allDay, calendar.opt('forceEventDuration') || Boolean(dragMeta.duration), // hasEnd
    calendar);
    var start = dateSpan.range.start;
    // only rely on time info if drop zone is all-day,
    // otherwise, we already know the time
    if (dateSpan.allDay && dragMeta.startTime) {
        start = calendar.dateEnv.add(start, dragMeta.startTime);
    }
    var end = dragMeta.duration ?
        calendar.dateEnv.add(start, dragMeta.duration) :
        calendar.getDefaultEventEnd(dateSpan.allDay, start);
    var instance = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createEventInstance"])(def.defId, { start: start, end: end });
    return { def: def, instance: instance };
}
// Utils for extracting data from element
// ----------------------------------------------------------------------------------------------------
function getDragMetaFromEl(el) {
    var str = getEmbeddedElData(el, 'event');
    var obj = str ?
        JSON.parse(str) :
        { create: false }; // if no embedded data, assume no event creation
    return Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["parseDragMeta"])(obj);
}
_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["config"].dataAttrPrefix = '';
function getEmbeddedElData(el, name) {
    var prefix = _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["config"].dataAttrPrefix;
    var prefixedName = (prefix ? prefix + '-' : '') + name;
    return el.getAttribute('data-' + prefixedName) || '';
}

/*
Makes an element (that is *external* to any calendar) draggable.
Can pass in data that determines how an event will be created when dropped onto a calendar.
Leverages FullCalendar's internal drag-n-drop functionality WITHOUT a third-party drag system.
*/
var ExternalDraggable = /** @class */ (function () {
    function ExternalDraggable(el, settings) {
        var _this = this;
        if (settings === void 0) { settings = {}; }
        this.handlePointerDown = function (ev) {
            var dragging = _this.dragging;
            var _a = _this.settings, minDistance = _a.minDistance, longPressDelay = _a.longPressDelay;
            dragging.minDistance =
                minDistance != null ?
                    minDistance :
                    (ev.isTouch ? 0 : _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["globalDefaults"].eventDragMinDistance);
            dragging.delay =
                ev.isTouch ? // TODO: eventually read eventLongPressDelay instead vvv
                    (longPressDelay != null ? longPressDelay : _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["globalDefaults"].longPressDelay) :
                    0;
        };
        this.handleDragStart = function (ev) {
            if (ev.isTouch &&
                _this.dragging.delay &&
                ev.subjectEl.classList.contains('fc-event')) {
                _this.dragging.mirror.getMirrorEl().classList.add('fc-selected');
            }
        };
        this.settings = settings;
        var dragging = this.dragging = new FeaturefulElementDragging(el);
        dragging.touchScrollAllowed = false;
        if (settings.itemSelector != null) {
            dragging.pointer.selector = settings.itemSelector;
        }
        if (settings.appendTo != null) {
            dragging.mirror.parentNode = settings.appendTo; // TODO: write tests
        }
        dragging.emitter.on('pointerdown', this.handlePointerDown);
        dragging.emitter.on('dragstart', this.handleDragStart);
        new ExternalElementDragging(dragging, settings.eventData);
    }
    ExternalDraggable.prototype.destroy = function () {
        this.dragging.destroy();
    };
    return ExternalDraggable;
}());

/*
Detects when a *THIRD-PARTY* drag-n-drop system interacts with elements.
The third-party system is responsible for drawing the visuals effects of the drag.
This class simply monitors for pointer movements and fires events.
It also has the ability to hide the moving element (the "mirror") during the drag.
*/
var InferredElementDragging = /** @class */ (function (_super) {
    __extends(InferredElementDragging, _super);
    function InferredElementDragging(containerEl) {
        var _this = _super.call(this, containerEl) || this;
        _this.shouldIgnoreMove = false;
        _this.mirrorSelector = '';
        _this.currentMirrorEl = null;
        _this.handlePointerDown = function (ev) {
            _this.emitter.trigger('pointerdown', ev);
            if (!_this.shouldIgnoreMove) {
                // fire dragstart right away. does not support delay or min-distance
                _this.emitter.trigger('dragstart', ev);
            }
        };
        _this.handlePointerMove = function (ev) {
            if (!_this.shouldIgnoreMove) {
                _this.emitter.trigger('dragmove', ev);
            }
        };
        _this.handlePointerUp = function (ev) {
            _this.emitter.trigger('pointerup', ev);
            if (!_this.shouldIgnoreMove) {
                // fire dragend right away. does not support a revert animation
                _this.emitter.trigger('dragend', ev);
            }
        };
        var pointer = _this.pointer = new PointerDragging(containerEl);
        pointer.emitter.on('pointerdown', _this.handlePointerDown);
        pointer.emitter.on('pointermove', _this.handlePointerMove);
        pointer.emitter.on('pointerup', _this.handlePointerUp);
        return _this;
    }
    InferredElementDragging.prototype.destroy = function () {
        this.pointer.destroy();
    };
    InferredElementDragging.prototype.setIgnoreMove = function (bool) {
        this.shouldIgnoreMove = bool;
    };
    InferredElementDragging.prototype.setMirrorIsVisible = function (bool) {
        if (bool) {
            // restore a previously hidden element.
            // use the reference in case the selector class has already been removed.
            if (this.currentMirrorEl) {
                this.currentMirrorEl.style.visibility = '';
                this.currentMirrorEl = null;
            }
        }
        else {
            var mirrorEl = this.mirrorSelector ?
                document.querySelector(this.mirrorSelector) :
                null;
            if (mirrorEl) {
                this.currentMirrorEl = mirrorEl;
                mirrorEl.style.visibility = 'hidden';
            }
        }
    };
    return InferredElementDragging;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["ElementDragging"]));

/*
Bridges third-party drag-n-drop systems with FullCalendar.
Must be instantiated and destroyed by caller.
*/
var ThirdPartyDraggable = /** @class */ (function () {
    function ThirdPartyDraggable(containerOrSettings, settings) {
        var containerEl = document;
        if (
        // wish we could just test instanceof EventTarget, but doesn't work in IE11
        containerOrSettings === document ||
            containerOrSettings instanceof Element) {
            containerEl = containerOrSettings;
            settings = settings || {};
        }
        else {
            settings = (containerOrSettings || {});
        }
        var dragging = this.dragging = new InferredElementDragging(containerEl);
        if (typeof settings.itemSelector === 'string') {
            dragging.pointer.selector = settings.itemSelector;
        }
        else if (containerEl === document) {
            dragging.pointer.selector = '[data-event]';
        }
        if (typeof settings.mirrorSelector === 'string') {
            dragging.mirrorSelector = settings.mirrorSelector;
        }
        new ExternalElementDragging(dragging, settings.eventData);
    }
    ThirdPartyDraggable.prototype.destroy = function () {
        this.dragging.destroy();
    };
    return ThirdPartyDraggable;
}());

var main = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createPlugin"])({
    componentInteractions: [DateClicking, DateSelecting, EventDragging, EventDragging$1],
    calendarInteractions: [UnselectAuto],
    elementDraggingImpl: FeaturefulElementDragging
});

/* harmony default export */ __webpack_exports__["default"] = (main);



/***/ }),

/***/ "./node_modules/@fullcalendar/list/main.esm.js":
/*!*****************************************************!*\
  !*** ./node_modules/@fullcalendar/list/main.esm.js ***!
  \*****************************************************/
/*! exports provided: default, ListView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListView", function() { return ListView; });
/* harmony import */ var _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fullcalendar/core */ "./node_modules/@fullcalendar/core/main.esm.js");
/*!
FullCalendar List View Plugin v4.4.2
Docs & License: https://fullcalendar.io/
(c) 2019 Adam Shaw
*/



/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var ListEventRenderer = /** @class */ (function (_super) {
    __extends(ListEventRenderer, _super);
    function ListEventRenderer(listView) {
        var _this = _super.call(this) || this;
        _this.listView = listView;
        return _this;
    }
    ListEventRenderer.prototype.attachSegs = function (segs) {
        if (!segs.length) {
            this.listView.renderEmptyMessage();
        }
        else {
            this.listView.renderSegList(segs);
        }
    };
    ListEventRenderer.prototype.detachSegs = function () {
    };
    // generates the HTML for a single event row
    ListEventRenderer.prototype.renderSegHtml = function (seg) {
        var _a = this.context, theme = _a.theme, options = _a.options;
        var eventRange = seg.eventRange;
        var eventDef = eventRange.def;
        var eventInstance = eventRange.instance;
        var eventUi = eventRange.ui;
        var url = eventDef.url;
        var classes = ['fc-list-item'].concat(eventUi.classNames);
        var bgColor = eventUi.backgroundColor;
        var timeHtml;
        if (eventDef.allDay) {
            timeHtml = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["getAllDayHtml"])(options);
        }
        else if (Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["isMultiDayRange"])(eventRange.range)) {
            if (seg.isStart) {
                timeHtml = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["htmlEscape"])(this._getTimeText(eventInstance.range.start, seg.end, false // allDay
                ));
            }
            else if (seg.isEnd) {
                timeHtml = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["htmlEscape"])(this._getTimeText(seg.start, eventInstance.range.end, false // allDay
                ));
            }
            else { // inner segment that lasts the whole day
                timeHtml = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["getAllDayHtml"])(options);
            }
        }
        else {
            // Display the normal time text for the *event's* times
            timeHtml = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["htmlEscape"])(this.getTimeText(eventRange));
        }
        if (url) {
            classes.push('fc-has-url');
        }
        return '<tr class="' + classes.join(' ') + '">' +
            (this.displayEventTime ?
                '<td class="fc-list-item-time ' + theme.getClass('widgetContent') + '">' +
                    (timeHtml || '') +
                    '</td>' :
                '') +
            '<td class="fc-list-item-marker ' + theme.getClass('widgetContent') + '">' +
            '<span class="fc-event-dot"' +
            (bgColor ?
                ' style="background-color:' + bgColor + '"' :
                '') +
            '></span>' +
            '</td>' +
            '<td class="fc-list-item-title ' + theme.getClass('widgetContent') + '">' +
            '<a' + (url ? ' href="' + Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["htmlEscape"])(url) + '"' : '') + '>' +
            Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["htmlEscape"])(eventDef.title || '') +
            '</a>' +
            '</td>' +
            '</tr>';
    };
    // like "4:00am"
    ListEventRenderer.prototype.computeEventTimeFormat = function () {
        return {
            hour: 'numeric',
            minute: '2-digit',
            meridiem: 'short'
        };
    };
    return ListEventRenderer;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["FgEventRenderer"]));

/*
Responsible for the scroller, and forwarding event-related actions into the "grid".
*/
var ListView = /** @class */ (function (_super) {
    __extends(ListView, _super);
    function ListView(viewSpec, parentEl) {
        var _this = _super.call(this, viewSpec, parentEl) || this;
        _this.computeDateVars = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoize"])(computeDateVars);
        _this.eventStoreToSegs = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoize"])(_this._eventStoreToSegs);
        _this.renderSkeleton = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(_this._renderSkeleton, _this._unrenderSkeleton);
        var eventRenderer = _this.eventRenderer = new ListEventRenderer(_this);
        _this.renderContent = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(eventRenderer.renderSegs.bind(eventRenderer), eventRenderer.unrender.bind(eventRenderer), [_this.renderSkeleton]);
        return _this;
    }
    ListView.prototype.firstContext = function (context) {
        context.calendar.registerInteractiveComponent(this, {
            el: this.el
            // TODO: make aware that it doesn't do Hits
        });
    };
    ListView.prototype.render = function (props, context) {
        _super.prototype.render.call(this, props, context);
        var _a = this.computeDateVars(props.dateProfile), dayDates = _a.dayDates, dayRanges = _a.dayRanges;
        this.dayDates = dayDates;
        this.renderSkeleton(context);
        this.renderContent(context, this.eventStoreToSegs(props.eventStore, props.eventUiBases, dayRanges));
    };
    ListView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.renderSkeleton.unrender();
        this.renderContent.unrender();
        this.context.calendar.unregisterInteractiveComponent(this);
    };
    ListView.prototype._renderSkeleton = function (context) {
        var theme = context.theme;
        this.el.classList.add('fc-list-view');
        var listViewClassNames = (theme.getClass('listView') || '').split(' '); // wish we didn't have to do this
        for (var _i = 0, listViewClassNames_1 = listViewClassNames; _i < listViewClassNames_1.length; _i++) {
            var listViewClassName = listViewClassNames_1[_i];
            if (listViewClassName) { // in case input was empty string
                this.el.classList.add(listViewClassName);
            }
        }
        this.scroller = new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["ScrollComponent"]('hidden', // overflow x
        'auto' // overflow y
        );
        this.el.appendChild(this.scroller.el);
        this.contentEl = this.scroller.el; // shortcut
    };
    ListView.prototype._unrenderSkeleton = function () {
        // TODO: remove classNames
        this.scroller.destroy(); // will remove the Grid too
    };
    ListView.prototype.updateSize = function (isResize, viewHeight, isAuto) {
        _super.prototype.updateSize.call(this, isResize, viewHeight, isAuto);
        this.eventRenderer.computeSizes(isResize);
        this.eventRenderer.assignSizes(isResize);
        this.scroller.clear(); // sets height to 'auto' and clears overflow
        if (!isAuto) {
            this.scroller.setHeight(this.computeScrollerHeight(viewHeight));
        }
    };
    ListView.prototype.computeScrollerHeight = function (viewHeight) {
        return viewHeight -
            Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["subtractInnerElHeight"])(this.el, this.scroller.el); // everything that's NOT the scroller
    };
    ListView.prototype._eventStoreToSegs = function (eventStore, eventUiBases, dayRanges) {
        return this.eventRangesToSegs(Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["sliceEventStore"])(eventStore, eventUiBases, this.props.dateProfile.activeRange, this.context.nextDayThreshold).fg, dayRanges);
    };
    ListView.prototype.eventRangesToSegs = function (eventRanges, dayRanges) {
        var segs = [];
        for (var _i = 0, eventRanges_1 = eventRanges; _i < eventRanges_1.length; _i++) {
            var eventRange = eventRanges_1[_i];
            segs.push.apply(segs, this.eventRangeToSegs(eventRange, dayRanges));
        }
        return segs;
    };
    ListView.prototype.eventRangeToSegs = function (eventRange, dayRanges) {
        var _a = this.context, dateEnv = _a.dateEnv, nextDayThreshold = _a.nextDayThreshold;
        var range = eventRange.range;
        var allDay = eventRange.def.allDay;
        var dayIndex;
        var segRange;
        var seg;
        var segs = [];
        for (dayIndex = 0; dayIndex < dayRanges.length; dayIndex++) {
            segRange = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["intersectRanges"])(range, dayRanges[dayIndex]);
            if (segRange) {
                seg = {
                    component: this,
                    eventRange: eventRange,
                    start: segRange.start,
                    end: segRange.end,
                    isStart: eventRange.isStart && segRange.start.valueOf() === range.start.valueOf(),
                    isEnd: eventRange.isEnd && segRange.end.valueOf() === range.end.valueOf(),
                    dayIndex: dayIndex
                };
                segs.push(seg);
                // detect when range won't go fully into the next day,
                // and mutate the latest seg to the be the end.
                if (!seg.isEnd && !allDay &&
                    dayIndex + 1 < dayRanges.length &&
                    range.end <
                        dateEnv.add(dayRanges[dayIndex + 1].start, nextDayThreshold)) {
                    seg.end = range.end;
                    seg.isEnd = true;
                    break;
                }
            }
        }
        return segs;
    };
    ListView.prototype.renderEmptyMessage = function () {
        this.contentEl.innerHTML =
            '<div class="fc-list-empty-wrap2">' + // TODO: try less wraps
                '<div class="fc-list-empty-wrap1">' +
                '<div class="fc-list-empty">' +
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["htmlEscape"])(this.context.options.noEventsMessage) +
                '</div>' +
                '</div>' +
                '</div>';
    };
    // called by ListEventRenderer
    ListView.prototype.renderSegList = function (allSegs) {
        var theme = this.context.theme;
        var segsByDay = this.groupSegsByDay(allSegs); // sparse array
        var dayIndex;
        var daySegs;
        var i;
        var tableEl = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["htmlToElement"])('<table class="fc-list-table ' + theme.getClass('tableList') + '"><tbody></tbody></table>');
        var tbodyEl = tableEl.querySelector('tbody');
        for (dayIndex = 0; dayIndex < segsByDay.length; dayIndex++) {
            daySegs = segsByDay[dayIndex];
            if (daySegs) { // sparse array, so might be undefined
                // append a day header
                tbodyEl.appendChild(this.buildDayHeaderRow(this.dayDates[dayIndex]));
                daySegs = this.eventRenderer.sortEventSegs(daySegs);
                for (i = 0; i < daySegs.length; i++) {
                    tbodyEl.appendChild(daySegs[i].el); // append event row
                }
            }
        }
        this.contentEl.innerHTML = '';
        this.contentEl.appendChild(tableEl);
    };
    // Returns a sparse array of arrays, segs grouped by their dayIndex
    ListView.prototype.groupSegsByDay = function (segs) {
        var segsByDay = []; // sparse array
        var i;
        var seg;
        for (i = 0; i < segs.length; i++) {
            seg = segs[i];
            (segsByDay[seg.dayIndex] || (segsByDay[seg.dayIndex] = []))
                .push(seg);
        }
        return segsByDay;
    };
    // generates the HTML for the day headers that live amongst the event rows
    ListView.prototype.buildDayHeaderRow = function (dayDate) {
        var _a = this.context, theme = _a.theme, dateEnv = _a.dateEnv, options = _a.options;
        var mainFormat = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createFormatter"])(options.listDayFormat); // TODO: cache
        var altFormat = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createFormatter"])(options.listDayAltFormat); // TODO: cache
        return Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createElement"])('tr', {
            className: 'fc-list-heading',
            'data-date': dateEnv.formatIso(dayDate, { omitTime: true })
        }, '<td class="' + (theme.getClass('tableListHeading') ||
            theme.getClass('widgetHeader')) + '" colspan="3">' +
            (mainFormat ?
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["buildGotoAnchorHtml"])(options, dateEnv, dayDate, { 'class': 'fc-list-heading-main' }, Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["htmlEscape"])(dateEnv.format(dayDate, mainFormat)) // inner HTML
                ) :
                '') +
            (altFormat ?
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["buildGotoAnchorHtml"])(options, dateEnv, dayDate, { 'class': 'fc-list-heading-alt' }, Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["htmlEscape"])(dateEnv.format(dayDate, altFormat)) // inner HTML
                ) :
                '') +
            '</td>');
    };
    return ListView;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["View"]));
ListView.prototype.fgSegSelector = '.fc-list-item'; // which elements accept event actions
function computeDateVars(dateProfile) {
    var dayStart = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["startOfDay"])(dateProfile.renderRange.start);
    var viewEnd = dateProfile.renderRange.end;
    var dayDates = [];
    var dayRanges = [];
    while (dayStart < viewEnd) {
        dayDates.push(dayStart);
        dayRanges.push({
            start: dayStart,
            end: Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["addDays"])(dayStart, 1)
        });
        dayStart = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["addDays"])(dayStart, 1);
    }
    return { dayDates: dayDates, dayRanges: dayRanges };
}

var main = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createPlugin"])({
    views: {
        list: {
            class: ListView,
            buttonTextKey: 'list',
            listDayFormat: { month: 'long', day: 'numeric', year: 'numeric' } // like "January 1, 2016"
        },
        listDay: {
            type: 'list',
            duration: { days: 1 },
            listDayFormat: { weekday: 'long' } // day-of-week is all we need. full date is probably in header
        },
        listWeek: {
            type: 'list',
            duration: { weeks: 1 },
            listDayFormat: { weekday: 'long' },
            listDayAltFormat: { month: 'long', day: 'numeric', year: 'numeric' }
        },
        listMonth: {
            type: 'list',
            duration: { month: 1 },
            listDayAltFormat: { weekday: 'long' } // day-of-week is nice-to-have
        },
        listYear: {
            type: 'list',
            duration: { year: 1 },
            listDayAltFormat: { weekday: 'long' } // day-of-week is nice-to-have
        }
    }
});

/* harmony default export */ __webpack_exports__["default"] = (main);



/***/ }),

/***/ "./node_modules/@fullcalendar/timegrid/main.esm.js":
/*!*********************************************************!*\
  !*** ./node_modules/@fullcalendar/timegrid/main.esm.js ***!
  \*********************************************************/
/*! exports provided: default, AbstractTimeGridView, TimeGrid, TimeGridSlicer, TimeGridView, buildDayRanges, buildDayTable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractTimeGridView", function() { return AbstractTimeGridView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimeGrid", function() { return TimeGrid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimeGridSlicer", function() { return TimeGridSlicer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimeGridView", function() { return TimeGridView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildDayRanges", function() { return buildDayRanges; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildDayTable", function() { return buildDayTable; });
/* harmony import */ var _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fullcalendar/core */ "./node_modules/@fullcalendar/core/main.esm.js");
/* harmony import */ var _fullcalendar_daygrid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fullcalendar/daygrid */ "./node_modules/@fullcalendar/daygrid/main.esm.js");
/*!
FullCalendar Time Grid Plugin v4.4.2
Docs & License: https://fullcalendar.io/
(c) 2019 Adam Shaw
*/




/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

/*
Only handles foreground segs.
Does not own rendering. Use for low-level util methods by TimeGrid.
*/
var TimeGridEventRenderer = /** @class */ (function (_super) {
    __extends(TimeGridEventRenderer, _super);
    function TimeGridEventRenderer(timeGrid) {
        var _this = _super.call(this) || this;
        _this.timeGrid = timeGrid;
        return _this;
    }
    TimeGridEventRenderer.prototype.renderSegs = function (context, segs, mirrorInfo) {
        _super.prototype.renderSegs.call(this, context, segs, mirrorInfo);
        // TODO: dont do every time. memoize
        this.fullTimeFormat = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createFormatter"])({
            hour: 'numeric',
            minute: '2-digit',
            separator: this.context.options.defaultRangeSeparator
        });
    };
    // Given an array of foreground segments, render a DOM element for each, computes position,
    // and attaches to the column inner-container elements.
    TimeGridEventRenderer.prototype.attachSegs = function (segs, mirrorInfo) {
        var segsByCol = this.timeGrid.groupSegsByCol(segs);
        // order the segs within each column
        // TODO: have groupSegsByCol do this?
        for (var col = 0; col < segsByCol.length; col++) {
            segsByCol[col] = this.sortEventSegs(segsByCol[col]);
        }
        this.segsByCol = segsByCol;
        this.timeGrid.attachSegsByCol(segsByCol, this.timeGrid.fgContainerEls);
    };
    TimeGridEventRenderer.prototype.detachSegs = function (segs) {
        segs.forEach(function (seg) {
            Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["removeElement"])(seg.el);
        });
        this.segsByCol = null;
    };
    TimeGridEventRenderer.prototype.computeSegSizes = function (allSegs) {
        var _a = this, timeGrid = _a.timeGrid, segsByCol = _a.segsByCol;
        var colCnt = timeGrid.colCnt;
        timeGrid.computeSegVerticals(allSegs); // horizontals relies on this
        if (segsByCol) {
            for (var col = 0; col < colCnt; col++) {
                this.computeSegHorizontals(segsByCol[col]); // compute horizontal coordinates, z-index's, and reorder the array
            }
        }
    };
    TimeGridEventRenderer.prototype.assignSegSizes = function (allSegs) {
        var _a = this, timeGrid = _a.timeGrid, segsByCol = _a.segsByCol;
        var colCnt = timeGrid.colCnt;
        timeGrid.assignSegVerticals(allSegs); // horizontals relies on this
        if (segsByCol) {
            for (var col = 0; col < colCnt; col++) {
                this.assignSegCss(segsByCol[col]);
            }
        }
    };
    // Computes a default event time formatting string if `eventTimeFormat` is not explicitly defined
    TimeGridEventRenderer.prototype.computeEventTimeFormat = function () {
        return {
            hour: 'numeric',
            minute: '2-digit',
            meridiem: false
        };
    };
    // Computes a default `displayEventEnd` value if one is not expliclty defined
    TimeGridEventRenderer.prototype.computeDisplayEventEnd = function () {
        return true;
    };
    // Renders the HTML for a single event segment's default rendering
    TimeGridEventRenderer.prototype.renderSegHtml = function (seg, mirrorInfo) {
        var eventRange = seg.eventRange;
        var eventDef = eventRange.def;
        var eventUi = eventRange.ui;
        var allDay = eventDef.allDay;
        var isDraggable = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["computeEventDraggable"])(this.context, eventDef, eventUi);
        var isResizableFromStart = seg.isStart && Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["computeEventStartResizable"])(this.context, eventDef, eventUi);
        var isResizableFromEnd = seg.isEnd && Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["computeEventEndResizable"])(this.context, eventDef, eventUi);
        var classes = this.getSegClasses(seg, isDraggable, isResizableFromStart || isResizableFromEnd, mirrorInfo);
        var skinCss = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["cssToStr"])(this.getSkinCss(eventUi));
        var timeText;
        var fullTimeText; // more verbose time text. for the print stylesheet
        var startTimeText; // just the start time text
        classes.unshift('fc-time-grid-event');
        // if the event appears to span more than one day...
        if (Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["isMultiDayRange"])(eventRange.range)) {
            // Don't display time text on segments that run entirely through a day.
            // That would appear as midnight-midnight and would look dumb.
            // Otherwise, display the time text for the *segment's* times (like 6pm-midnight or midnight-10am)
            if (seg.isStart || seg.isEnd) {
                var unzonedStart = seg.start;
                var unzonedEnd = seg.end;
                timeText = this._getTimeText(unzonedStart, unzonedEnd, allDay); // TODO: give the timezones
                fullTimeText = this._getTimeText(unzonedStart, unzonedEnd, allDay, this.fullTimeFormat);
                startTimeText = this._getTimeText(unzonedStart, unzonedEnd, allDay, null, false); // displayEnd=false
            }
        }
        else {
            // Display the normal time text for the *event's* times
            timeText = this.getTimeText(eventRange);
            fullTimeText = this.getTimeText(eventRange, this.fullTimeFormat);
            startTimeText = this.getTimeText(eventRange, null, false); // displayEnd=false
        }
        return '<a class="' + classes.join(' ') + '"' +
            (eventDef.url ?
                ' href="' + Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["htmlEscape"])(eventDef.url) + '"' :
                '') +
            (skinCss ?
                ' style="' + skinCss + '"' :
                '') +
            '>' +
            '<div class="fc-content">' +
            (timeText ?
                '<div class="fc-time"' +
                    ' data-start="' + Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["htmlEscape"])(startTimeText) + '"' +
                    ' data-full="' + Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["htmlEscape"])(fullTimeText) + '"' +
                    '>' +
                    '<span>' + Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["htmlEscape"])(timeText) + '</span>' +
                    '</div>' :
                '') +
            (eventDef.title ?
                '<div class="fc-title">' +
                    Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["htmlEscape"])(eventDef.title) +
                    '</div>' :
                '') +
            '</div>' +
            /* TODO: write CSS for this
            (isResizableFromStart ?
              '<div class="fc-resizer fc-start-resizer"></div>' :
              ''
              ) +
            */
            (isResizableFromEnd ?
                '<div class="fc-resizer fc-end-resizer"></div>' :
                '') +
            '</a>';
    };
    // Given an array of segments that are all in the same column, sets the backwardCoord and forwardCoord on each.
    // Assumed the segs are already ordered.
    // NOTE: Also reorders the given array by date!
    TimeGridEventRenderer.prototype.computeSegHorizontals = function (segs) {
        var levels;
        var level0;
        var i;
        levels = buildSlotSegLevels(segs);
        computeForwardSlotSegs(levels);
        if ((level0 = levels[0])) {
            for (i = 0; i < level0.length; i++) {
                computeSlotSegPressures(level0[i]);
            }
            for (i = 0; i < level0.length; i++) {
                this.computeSegForwardBack(level0[i], 0, 0);
            }
        }
    };
    // Calculate seg.forwardCoord and seg.backwardCoord for the segment, where both values range
    // from 0 to 1. If the calendar is left-to-right, the seg.backwardCoord maps to "left" and
    // seg.forwardCoord maps to "right" (via percentage). Vice-versa if the calendar is right-to-left.
    //
    // The segment might be part of a "series", which means consecutive segments with the same pressure
    // who's width is unknown until an edge has been hit. `seriesBackwardPressure` is the number of
    // segments behind this one in the current series, and `seriesBackwardCoord` is the starting
    // coordinate of the first segment in the series.
    TimeGridEventRenderer.prototype.computeSegForwardBack = function (seg, seriesBackwardPressure, seriesBackwardCoord) {
        var forwardSegs = seg.forwardSegs;
        var i;
        if (seg.forwardCoord === undefined) { // not already computed
            if (!forwardSegs.length) {
                // if there are no forward segments, this segment should butt up against the edge
                seg.forwardCoord = 1;
            }
            else {
                // sort highest pressure first
                this.sortForwardSegs(forwardSegs);
                // this segment's forwardCoord will be calculated from the backwardCoord of the
                // highest-pressure forward segment.
                this.computeSegForwardBack(forwardSegs[0], seriesBackwardPressure + 1, seriesBackwardCoord);
                seg.forwardCoord = forwardSegs[0].backwardCoord;
            }
            // calculate the backwardCoord from the forwardCoord. consider the series
            seg.backwardCoord = seg.forwardCoord -
                (seg.forwardCoord - seriesBackwardCoord) / // available width for series
                    (seriesBackwardPressure + 1); // # of segments in the series
            // use this segment's coordinates to computed the coordinates of the less-pressurized
            // forward segments
            for (i = 0; i < forwardSegs.length; i++) {
                this.computeSegForwardBack(forwardSegs[i], 0, seg.forwardCoord);
            }
        }
    };
    TimeGridEventRenderer.prototype.sortForwardSegs = function (forwardSegs) {
        var objs = forwardSegs.map(buildTimeGridSegCompareObj);
        var specs = [
            // put higher-pressure first
            { field: 'forwardPressure', order: -1 },
            // put segments that are closer to initial edge first (and favor ones with no coords yet)
            { field: 'backwardCoord', order: 1 }
        ].concat(this.context.eventOrderSpecs);
        objs.sort(function (obj0, obj1) {
            return Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["compareByFieldSpecs"])(obj0, obj1, specs);
        });
        return objs.map(function (c) {
            return c._seg;
        });
    };
    // Given foreground event segments that have already had their position coordinates computed,
    // assigns position-related CSS values to their elements.
    TimeGridEventRenderer.prototype.assignSegCss = function (segs) {
        for (var _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
            var seg = segs_1[_i];
            Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["applyStyle"])(seg.el, this.generateSegCss(seg));
            if (seg.level > 0) {
                seg.el.classList.add('fc-time-grid-event-inset');
            }
            // if the event is short that the title will be cut off,
            // attach a className that condenses the title into the time area.
            if (seg.eventRange.def.title && seg.bottom - seg.top < 30) {
                seg.el.classList.add('fc-short'); // TODO: "condensed" is a better name
            }
        }
    };
    // Generates an object with CSS properties/values that should be applied to an event segment element.
    // Contains important positioning-related properties that should be applied to any event element, customized or not.
    TimeGridEventRenderer.prototype.generateSegCss = function (seg) {
        var shouldOverlap = this.context.options.slotEventOverlap;
        var backwardCoord = seg.backwardCoord; // the left side if LTR. the right side if RTL. floating-point
        var forwardCoord = seg.forwardCoord; // the right side if LTR. the left side if RTL. floating-point
        var props = this.timeGrid.generateSegVerticalCss(seg); // get top/bottom first
        var isRtl = this.context.isRtl;
        var left; // amount of space from left edge, a fraction of the total width
        var right; // amount of space from right edge, a fraction of the total width
        if (shouldOverlap) {
            // double the width, but don't go beyond the maximum forward coordinate (1.0)
            forwardCoord = Math.min(1, backwardCoord + (forwardCoord - backwardCoord) * 2);
        }
        if (isRtl) {
            left = 1 - forwardCoord;
            right = backwardCoord;
        }
        else {
            left = backwardCoord;
            right = 1 - forwardCoord;
        }
        props.zIndex = seg.level + 1; // convert from 0-base to 1-based
        props.left = left * 100 + '%';
        props.right = right * 100 + '%';
        if (shouldOverlap && seg.forwardPressure) {
            // add padding to the edge so that forward stacked events don't cover the resizer's icon
            props[isRtl ? 'marginLeft' : 'marginRight'] = 10 * 2; // 10 is a guesstimate of the icon's width
        }
        return props;
    };
    return TimeGridEventRenderer;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["FgEventRenderer"]));
// Builds an array of segments "levels". The first level will be the leftmost tier of segments if the calendar is
// left-to-right, or the rightmost if the calendar is right-to-left. Assumes the segments are already ordered by date.
function buildSlotSegLevels(segs) {
    var levels = [];
    var i;
    var seg;
    var j;
    for (i = 0; i < segs.length; i++) {
        seg = segs[i];
        // go through all the levels and stop on the first level where there are no collisions
        for (j = 0; j < levels.length; j++) {
            if (!computeSlotSegCollisions(seg, levels[j]).length) {
                break;
            }
        }
        seg.level = j;
        (levels[j] || (levels[j] = [])).push(seg);
    }
    return levels;
}
// For every segment, figure out the other segments that are in subsequent
// levels that also occupy the same vertical space. Accumulate in seg.forwardSegs
function computeForwardSlotSegs(levels) {
    var i;
    var level;
    var j;
    var seg;
    var k;
    for (i = 0; i < levels.length; i++) {
        level = levels[i];
        for (j = 0; j < level.length; j++) {
            seg = level[j];
            seg.forwardSegs = [];
            for (k = i + 1; k < levels.length; k++) {
                computeSlotSegCollisions(seg, levels[k], seg.forwardSegs);
            }
        }
    }
}
// Figure out which path forward (via seg.forwardSegs) results in the longest path until
// the furthest edge is reached. The number of segments in this path will be seg.forwardPressure
function computeSlotSegPressures(seg) {
    var forwardSegs = seg.forwardSegs;
    var forwardPressure = 0;
    var i;
    var forwardSeg;
    if (seg.forwardPressure === undefined) { // not already computed
        for (i = 0; i < forwardSegs.length; i++) {
            forwardSeg = forwardSegs[i];
            // figure out the child's maximum forward path
            computeSlotSegPressures(forwardSeg);
            // either use the existing maximum, or use the child's forward pressure
            // plus one (for the forwardSeg itself)
            forwardPressure = Math.max(forwardPressure, 1 + forwardSeg.forwardPressure);
        }
        seg.forwardPressure = forwardPressure;
    }
}
// Find all the segments in `otherSegs` that vertically collide with `seg`.
// Append into an optionally-supplied `results` array and return.
function computeSlotSegCollisions(seg, otherSegs, results) {
    if (results === void 0) { results = []; }
    for (var i = 0; i < otherSegs.length; i++) {
        if (isSlotSegCollision(seg, otherSegs[i])) {
            results.push(otherSegs[i]);
        }
    }
    return results;
}
// Do these segments occupy the same vertical space?
function isSlotSegCollision(seg1, seg2) {
    return seg1.bottom > seg2.top && seg1.top < seg2.bottom;
}
function buildTimeGridSegCompareObj(seg) {
    var obj = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["buildSegCompareObj"])(seg);
    obj.forwardPressure = seg.forwardPressure;
    obj.backwardCoord = seg.backwardCoord;
    return obj;
}

var TimeGridMirrorRenderer = /** @class */ (function (_super) {
    __extends(TimeGridMirrorRenderer, _super);
    function TimeGridMirrorRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimeGridMirrorRenderer.prototype.attachSegs = function (segs, mirrorInfo) {
        this.segsByCol = this.timeGrid.groupSegsByCol(segs);
        this.timeGrid.attachSegsByCol(this.segsByCol, this.timeGrid.mirrorContainerEls);
        this.sourceSeg = mirrorInfo.sourceSeg;
    };
    TimeGridMirrorRenderer.prototype.generateSegCss = function (seg) {
        var props = _super.prototype.generateSegCss.call(this, seg);
        var sourceSeg = this.sourceSeg;
        if (sourceSeg && sourceSeg.col === seg.col) {
            var sourceSegProps = _super.prototype.generateSegCss.call(this, sourceSeg);
            props.left = sourceSegProps.left;
            props.right = sourceSegProps.right;
            props.marginLeft = sourceSegProps.marginLeft;
            props.marginRight = sourceSegProps.marginRight;
        }
        return props;
    };
    return TimeGridMirrorRenderer;
}(TimeGridEventRenderer));

var TimeGridFillRenderer = /** @class */ (function (_super) {
    __extends(TimeGridFillRenderer, _super);
    function TimeGridFillRenderer(timeGrid) {
        var _this = _super.call(this) || this;
        _this.timeGrid = timeGrid;
        return _this;
    }
    TimeGridFillRenderer.prototype.attachSegs = function (type, segs) {
        var timeGrid = this.timeGrid;
        var containerEls;
        // TODO: more efficient lookup
        if (type === 'bgEvent') {
            containerEls = timeGrid.bgContainerEls;
        }
        else if (type === 'businessHours') {
            containerEls = timeGrid.businessContainerEls;
        }
        else if (type === 'highlight') {
            containerEls = timeGrid.highlightContainerEls;
        }
        timeGrid.attachSegsByCol(timeGrid.groupSegsByCol(segs), containerEls);
        return segs.map(function (seg) {
            return seg.el;
        });
    };
    TimeGridFillRenderer.prototype.computeSegSizes = function (segs) {
        this.timeGrid.computeSegVerticals(segs);
    };
    TimeGridFillRenderer.prototype.assignSegSizes = function (segs) {
        this.timeGrid.assignSegVerticals(segs);
    };
    return TimeGridFillRenderer;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["FillRenderer"]));

/* A component that renders one or more columns of vertical time slots
----------------------------------------------------------------------------------------------------------------------*/
// potential nice values for the slot-duration and interval-duration
// from largest to smallest
var AGENDA_STOCK_SUB_DURATIONS = [
    { hours: 1 },
    { minutes: 30 },
    { minutes: 15 },
    { seconds: 30 },
    { seconds: 15 }
];
var TimeGrid = /** @class */ (function (_super) {
    __extends(TimeGrid, _super);
    function TimeGrid(el, renderProps) {
        var _this = _super.call(this, el) || this;
        _this.isSlatSizesDirty = false;
        _this.isColSizesDirty = false;
        _this.processOptions = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoize"])(_this._processOptions);
        _this.renderSkeleton = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(_this._renderSkeleton);
        _this.renderSlats = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(_this._renderSlats, null, [_this.renderSkeleton]);
        _this.renderColumns = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(_this._renderColumns, _this._unrenderColumns, [_this.renderSkeleton]);
        _this.renderProps = renderProps;
        var renderColumns = _this.renderColumns;
        var eventRenderer = _this.eventRenderer = new TimeGridEventRenderer(_this);
        var fillRenderer = _this.fillRenderer = new TimeGridFillRenderer(_this);
        _this.mirrorRenderer = new TimeGridMirrorRenderer(_this);
        _this.renderBusinessHours = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(fillRenderer.renderSegs.bind(fillRenderer, 'businessHours'), fillRenderer.unrender.bind(fillRenderer, 'businessHours'), [renderColumns]);
        _this.renderDateSelection = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(_this._renderDateSelection, _this._unrenderDateSelection, [renderColumns]);
        _this.renderFgEvents = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(eventRenderer.renderSegs.bind(eventRenderer), eventRenderer.unrender.bind(eventRenderer), [renderColumns]);
        _this.renderBgEvents = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(fillRenderer.renderSegs.bind(fillRenderer, 'bgEvent'), fillRenderer.unrender.bind(fillRenderer, 'bgEvent'), [renderColumns]);
        _this.renderEventSelection = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(eventRenderer.selectByInstanceId.bind(eventRenderer), eventRenderer.unselectByInstanceId.bind(eventRenderer), [_this.renderFgEvents]);
        _this.renderEventDrag = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(_this._renderEventDrag, _this._unrenderEventDrag, [renderColumns]);
        _this.renderEventResize = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(_this._renderEventResize, _this._unrenderEventResize, [renderColumns]);
        return _this;
    }
    /* Options
    ------------------------------------------------------------------------------------------------------------------*/
    // Parses various options into properties of this object
    // MUST have context already set
    TimeGrid.prototype._processOptions = function (options) {
        var slotDuration = options.slotDuration, snapDuration = options.snapDuration;
        var snapsPerSlot;
        var input;
        slotDuration = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createDuration"])(slotDuration);
        snapDuration = snapDuration ? Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createDuration"])(snapDuration) : slotDuration;
        snapsPerSlot = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["wholeDivideDurations"])(slotDuration, snapDuration);
        if (snapsPerSlot === null) {
            snapDuration = slotDuration;
            snapsPerSlot = 1;
            // TODO: say warning?
        }
        this.slotDuration = slotDuration;
        this.snapDuration = snapDuration;
        this.snapsPerSlot = snapsPerSlot;
        // might be an array value (for TimelineView).
        // if so, getting the most granular entry (the last one probably).
        input = options.slotLabelFormat;
        if (Array.isArray(input)) {
            input = input[input.length - 1];
        }
        this.labelFormat = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createFormatter"])(input || {
            hour: 'numeric',
            minute: '2-digit',
            omitZeroMinute: true,
            meridiem: 'short'
        });
        input = options.slotLabelInterval;
        this.labelInterval = input ?
            Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createDuration"])(input) :
            this.computeLabelInterval(slotDuration);
    };
    // Computes an automatic value for slotLabelInterval
    TimeGrid.prototype.computeLabelInterval = function (slotDuration) {
        var i;
        var labelInterval;
        var slotsPerLabel;
        // find the smallest stock label interval that results in more than one slots-per-label
        for (i = AGENDA_STOCK_SUB_DURATIONS.length - 1; i >= 0; i--) {
            labelInterval = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createDuration"])(AGENDA_STOCK_SUB_DURATIONS[i]);
            slotsPerLabel = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["wholeDivideDurations"])(labelInterval, slotDuration);
            if (slotsPerLabel !== null && slotsPerLabel > 1) {
                return labelInterval;
            }
        }
        return slotDuration; // fall back
    };
    /* Rendering
    ------------------------------------------------------------------------------------------------------------------*/
    TimeGrid.prototype.render = function (props, context) {
        this.processOptions(context.options);
        var cells = props.cells;
        this.colCnt = cells.length;
        this.renderSkeleton(context.theme);
        this.renderSlats(props.dateProfile);
        this.renderColumns(props.cells, props.dateProfile);
        this.renderBusinessHours(context, props.businessHourSegs);
        this.renderDateSelection(props.dateSelectionSegs);
        this.renderFgEvents(context, props.fgEventSegs);
        this.renderBgEvents(context, props.bgEventSegs);
        this.renderEventSelection(props.eventSelection);
        this.renderEventDrag(props.eventDrag);
        this.renderEventResize(props.eventResize);
    };
    TimeGrid.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        // should unrender everything else too
        this.renderSlats.unrender();
        this.renderColumns.unrender();
        this.renderSkeleton.unrender();
    };
    TimeGrid.prototype.updateSize = function (isResize) {
        var _a = this, fillRenderer = _a.fillRenderer, eventRenderer = _a.eventRenderer, mirrorRenderer = _a.mirrorRenderer;
        if (isResize || this.isSlatSizesDirty) {
            this.buildSlatPositions();
            this.isSlatSizesDirty = false;
        }
        if (isResize || this.isColSizesDirty) {
            this.buildColPositions();
            this.isColSizesDirty = false;
        }
        fillRenderer.computeSizes(isResize);
        eventRenderer.computeSizes(isResize);
        mirrorRenderer.computeSizes(isResize);
        fillRenderer.assignSizes(isResize);
        eventRenderer.assignSizes(isResize);
        mirrorRenderer.assignSizes(isResize);
    };
    TimeGrid.prototype._renderSkeleton = function (theme) {
        var el = this.el;
        el.innerHTML =
            '<div class="fc-bg"></div>' +
                '<div class="fc-slats"></div>' +
                '<hr class="fc-divider ' + theme.getClass('widgetHeader') + '" style="display:none" />';
        this.rootBgContainerEl = el.querySelector('.fc-bg');
        this.slatContainerEl = el.querySelector('.fc-slats');
        this.bottomRuleEl = el.querySelector('.fc-divider');
    };
    TimeGrid.prototype._renderSlats = function (dateProfile) {
        var theme = this.context.theme;
        this.slatContainerEl.innerHTML =
            '<table class="' + theme.getClass('tableGrid') + '">' +
                this.renderSlatRowHtml(dateProfile) +
                '</table>';
        this.slatEls = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["findElements"])(this.slatContainerEl, 'tr');
        this.slatPositions = new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["PositionCache"](this.el, this.slatEls, false, true // vertical
        );
        this.isSlatSizesDirty = true;
    };
    // Generates the HTML for the horizontal "slats" that run width-wise. Has a time axis on a side. Depends on RTL.
    TimeGrid.prototype.renderSlatRowHtml = function (dateProfile) {
        var _a = this.context, dateEnv = _a.dateEnv, theme = _a.theme, isRtl = _a.isRtl;
        var html = '';
        var dayStart = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["startOfDay"])(dateProfile.renderRange.start);
        var slotTime = dateProfile.minTime;
        var slotIterator = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createDuration"])(0);
        var slotDate; // will be on the view's first day, but we only care about its time
        var isLabeled;
        var axisHtml;
        // Calculate the time for each slot
        while (Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["asRoughMs"])(slotTime) < Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["asRoughMs"])(dateProfile.maxTime)) {
            slotDate = dateEnv.add(dayStart, slotTime);
            isLabeled = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["wholeDivideDurations"])(slotIterator, this.labelInterval) !== null;
            axisHtml =
                '<td class="fc-axis fc-time ' + theme.getClass('widgetContent') + '">' +
                    (isLabeled ?
                        '<span>' + // for matchCellWidths
                            Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["htmlEscape"])(dateEnv.format(slotDate, this.labelFormat)) +
                            '</span>' :
                        '') +
                    '</td>';
            html +=
                '<tr data-time="' + Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["formatIsoTimeString"])(slotDate) + '"' +
                    (isLabeled ? '' : ' class="fc-minor"') +
                    '>' +
                    (!isRtl ? axisHtml : '') +
                    '<td class="' + theme.getClass('widgetContent') + '"></td>' +
                    (isRtl ? axisHtml : '') +
                    '</tr>';
            slotTime = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["addDurations"])(slotTime, this.slotDuration);
            slotIterator = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["addDurations"])(slotIterator, this.slotDuration);
        }
        return html;
    };
    TimeGrid.prototype._renderColumns = function (cells, dateProfile) {
        var _a = this.context, calendar = _a.calendar, view = _a.view, isRtl = _a.isRtl, theme = _a.theme, dateEnv = _a.dateEnv;
        var bgRow = new _fullcalendar_daygrid__WEBPACK_IMPORTED_MODULE_1__["DayBgRow"](this.context);
        this.rootBgContainerEl.innerHTML =
            '<table class="' + theme.getClass('tableGrid') + '">' +
                bgRow.renderHtml({
                    cells: cells,
                    dateProfile: dateProfile,
                    renderIntroHtml: this.renderProps.renderBgIntroHtml
                }) +
                '</table>';
        this.colEls = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["findElements"])(this.el, '.fc-day, .fc-disabled-day');
        for (var col = 0; col < this.colCnt; col++) {
            calendar.publiclyTrigger('dayRender', [
                {
                    date: dateEnv.toDate(cells[col].date),
                    el: this.colEls[col],
                    view: view
                }
            ]);
        }
        if (isRtl) {
            this.colEls.reverse();
        }
        this.colPositions = new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["PositionCache"](this.el, this.colEls, true, // horizontal
        false);
        this.renderContentSkeleton();
        this.isColSizesDirty = true;
    };
    TimeGrid.prototype._unrenderColumns = function () {
        this.unrenderContentSkeleton();
    };
    /* Content Skeleton
    ------------------------------------------------------------------------------------------------------------------*/
    // Renders the DOM that the view's content will live in
    TimeGrid.prototype.renderContentSkeleton = function () {
        var isRtl = this.context.isRtl;
        var parts = [];
        var skeletonEl;
        parts.push(this.renderProps.renderIntroHtml());
        for (var i = 0; i < this.colCnt; i++) {
            parts.push('<td>' +
                '<div class="fc-content-col">' +
                '<div class="fc-event-container fc-mirror-container"></div>' +
                '<div class="fc-event-container"></div>' +
                '<div class="fc-highlight-container"></div>' +
                '<div class="fc-bgevent-container"></div>' +
                '<div class="fc-business-container"></div>' +
                '</div>' +
                '</td>');
        }
        if (isRtl) {
            parts.reverse();
        }
        skeletonEl = this.contentSkeletonEl = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["htmlToElement"])('<div class="fc-content-skeleton">' +
            '<table>' +
            '<tr>' + parts.join('') + '</tr>' +
            '</table>' +
            '</div>');
        this.colContainerEls = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["findElements"])(skeletonEl, '.fc-content-col');
        this.mirrorContainerEls = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["findElements"])(skeletonEl, '.fc-mirror-container');
        this.fgContainerEls = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["findElements"])(skeletonEl, '.fc-event-container:not(.fc-mirror-container)');
        this.bgContainerEls = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["findElements"])(skeletonEl, '.fc-bgevent-container');
        this.highlightContainerEls = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["findElements"])(skeletonEl, '.fc-highlight-container');
        this.businessContainerEls = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["findElements"])(skeletonEl, '.fc-business-container');
        if (isRtl) {
            this.colContainerEls.reverse();
            this.mirrorContainerEls.reverse();
            this.fgContainerEls.reverse();
            this.bgContainerEls.reverse();
            this.highlightContainerEls.reverse();
            this.businessContainerEls.reverse();
        }
        this.el.appendChild(skeletonEl);
    };
    TimeGrid.prototype.unrenderContentSkeleton = function () {
        Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["removeElement"])(this.contentSkeletonEl);
    };
    // Given a flat array of segments, return an array of sub-arrays, grouped by each segment's col
    TimeGrid.prototype.groupSegsByCol = function (segs) {
        var segsByCol = [];
        var i;
        for (i = 0; i < this.colCnt; i++) {
            segsByCol.push([]);
        }
        for (i = 0; i < segs.length; i++) {
            segsByCol[segs[i].col].push(segs[i]);
        }
        return segsByCol;
    };
    // Given segments grouped by column, insert the segments' elements into a parallel array of container
    // elements, each living within a column.
    TimeGrid.prototype.attachSegsByCol = function (segsByCol, containerEls) {
        var col;
        var segs;
        var i;
        for (col = 0; col < this.colCnt; col++) { // iterate each column grouping
            segs = segsByCol[col];
            for (i = 0; i < segs.length; i++) {
                containerEls[col].appendChild(segs[i].el);
            }
        }
    };
    /* Now Indicator
    ------------------------------------------------------------------------------------------------------------------*/
    TimeGrid.prototype.getNowIndicatorUnit = function () {
        return 'minute'; // will refresh on the minute
    };
    TimeGrid.prototype.renderNowIndicator = function (segs, date) {
        // HACK: if date columns not ready for some reason (scheduler)
        if (!this.colContainerEls) {
            return;
        }
        var top = this.computeDateTop(date);
        var nodes = [];
        var i;
        // render lines within the columns
        for (i = 0; i < segs.length; i++) {
            var lineEl = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createElement"])('div', { className: 'fc-now-indicator fc-now-indicator-line' });
            lineEl.style.top = top + 'px';
            this.colContainerEls[segs[i].col].appendChild(lineEl);
            nodes.push(lineEl);
        }
        // render an arrow over the axis
        if (segs.length > 0) { // is the current time in view?
            var arrowEl = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createElement"])('div', { className: 'fc-now-indicator fc-now-indicator-arrow' });
            arrowEl.style.top = top + 'px';
            this.contentSkeletonEl.appendChild(arrowEl);
            nodes.push(arrowEl);
        }
        this.nowIndicatorEls = nodes;
    };
    TimeGrid.prototype.unrenderNowIndicator = function () {
        if (this.nowIndicatorEls) {
            this.nowIndicatorEls.forEach(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["removeElement"]);
            this.nowIndicatorEls = null;
        }
    };
    /* Coordinates
    ------------------------------------------------------------------------------------------------------------------*/
    TimeGrid.prototype.getTotalSlatHeight = function () {
        return this.slatContainerEl.getBoundingClientRect().height;
    };
    // Computes the top coordinate, relative to the bounds of the grid, of the given date.
    // A `startOfDayDate` must be given for avoiding ambiguity over how to treat midnight.
    TimeGrid.prototype.computeDateTop = function (when, startOfDayDate) {
        if (!startOfDayDate) {
            startOfDayDate = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["startOfDay"])(when);
        }
        return this.computeTimeTop(Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createDuration"])(when.valueOf() - startOfDayDate.valueOf()));
    };
    // Computes the top coordinate, relative to the bounds of the grid, of the given time (a Duration).
    TimeGrid.prototype.computeTimeTop = function (duration) {
        var len = this.slatEls.length;
        var dateProfile = this.props.dateProfile;
        var slatCoverage = (duration.milliseconds - Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["asRoughMs"])(dateProfile.minTime)) / Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["asRoughMs"])(this.slotDuration); // floating-point value of # of slots covered
        var slatIndex;
        var slatRemainder;
        // compute a floating-point number for how many slats should be progressed through.
        // from 0 to number of slats (inclusive)
        // constrained because minTime/maxTime might be customized.
        slatCoverage = Math.max(0, slatCoverage);
        slatCoverage = Math.min(len, slatCoverage);
        // an integer index of the furthest whole slat
        // from 0 to number slats (*exclusive*, so len-1)
        slatIndex = Math.floor(slatCoverage);
        slatIndex = Math.min(slatIndex, len - 1);
        // how much further through the slatIndex slat (from 0.0-1.0) must be covered in addition.
        // could be 1.0 if slatCoverage is covering *all* the slots
        slatRemainder = slatCoverage - slatIndex;
        return this.slatPositions.tops[slatIndex] +
            this.slatPositions.getHeight(slatIndex) * slatRemainder;
    };
    // For each segment in an array, computes and assigns its top and bottom properties
    TimeGrid.prototype.computeSegVerticals = function (segs) {
        var options = this.context.options;
        var eventMinHeight = options.timeGridEventMinHeight;
        var i;
        var seg;
        var dayDate;
        for (i = 0; i < segs.length; i++) {
            seg = segs[i];
            dayDate = this.props.cells[seg.col].date;
            seg.top = this.computeDateTop(seg.start, dayDate);
            seg.bottom = Math.max(seg.top + eventMinHeight, this.computeDateTop(seg.end, dayDate));
        }
    };
    // Given segments that already have their top/bottom properties computed, applies those values to
    // the segments' elements.
    TimeGrid.prototype.assignSegVerticals = function (segs) {
        var i;
        var seg;
        for (i = 0; i < segs.length; i++) {
            seg = segs[i];
            Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["applyStyle"])(seg.el, this.generateSegVerticalCss(seg));
        }
    };
    // Generates an object with CSS properties for the top/bottom coordinates of a segment element
    TimeGrid.prototype.generateSegVerticalCss = function (seg) {
        return {
            top: seg.top,
            bottom: -seg.bottom // flipped because needs to be space beyond bottom edge of event container
        };
    };
    /* Sizing
    ------------------------------------------------------------------------------------------------------------------*/
    TimeGrid.prototype.buildPositionCaches = function () {
        this.buildColPositions();
        this.buildSlatPositions();
    };
    TimeGrid.prototype.buildColPositions = function () {
        this.colPositions.build();
    };
    TimeGrid.prototype.buildSlatPositions = function () {
        this.slatPositions.build();
    };
    /* Hit System
    ------------------------------------------------------------------------------------------------------------------*/
    TimeGrid.prototype.positionToHit = function (positionLeft, positionTop) {
        var dateEnv = this.context.dateEnv;
        var _a = this, snapsPerSlot = _a.snapsPerSlot, slatPositions = _a.slatPositions, colPositions = _a.colPositions;
        var colIndex = colPositions.leftToIndex(positionLeft);
        var slatIndex = slatPositions.topToIndex(positionTop);
        if (colIndex != null && slatIndex != null) {
            var slatTop = slatPositions.tops[slatIndex];
            var slatHeight = slatPositions.getHeight(slatIndex);
            var partial = (positionTop - slatTop) / slatHeight; // floating point number between 0 and 1
            var localSnapIndex = Math.floor(partial * snapsPerSlot); // the snap # relative to start of slat
            var snapIndex = slatIndex * snapsPerSlot + localSnapIndex;
            var dayDate = this.props.cells[colIndex].date;
            var time = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["addDurations"])(this.props.dateProfile.minTime, Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["multiplyDuration"])(this.snapDuration, snapIndex));
            var start = dateEnv.add(dayDate, time);
            var end = dateEnv.add(start, this.snapDuration);
            return {
                col: colIndex,
                dateSpan: {
                    range: { start: start, end: end },
                    allDay: false
                },
                dayEl: this.colEls[colIndex],
                relativeRect: {
                    left: colPositions.lefts[colIndex],
                    right: colPositions.rights[colIndex],
                    top: slatTop,
                    bottom: slatTop + slatHeight
                }
            };
        }
    };
    /* Event Drag Visualization
    ------------------------------------------------------------------------------------------------------------------*/
    TimeGrid.prototype._renderEventDrag = function (state) {
        if (state) {
            this.eventRenderer.hideByHash(state.affectedInstances);
            if (state.isEvent) {
                this.mirrorRenderer.renderSegs(this.context, state.segs, { isDragging: true, sourceSeg: state.sourceSeg });
            }
            else {
                this.fillRenderer.renderSegs('highlight', this.context, state.segs);
            }
        }
    };
    TimeGrid.prototype._unrenderEventDrag = function (state) {
        if (state) {
            this.eventRenderer.showByHash(state.affectedInstances);
            if (state.isEvent) {
                this.mirrorRenderer.unrender(this.context, state.segs, { isDragging: true, sourceSeg: state.sourceSeg });
            }
            else {
                this.fillRenderer.unrender('highlight', this.context);
            }
        }
    };
    /* Event Resize Visualization
    ------------------------------------------------------------------------------------------------------------------*/
    TimeGrid.prototype._renderEventResize = function (state) {
        if (state) {
            this.eventRenderer.hideByHash(state.affectedInstances);
            this.mirrorRenderer.renderSegs(this.context, state.segs, { isResizing: true, sourceSeg: state.sourceSeg });
        }
    };
    TimeGrid.prototype._unrenderEventResize = function (state) {
        if (state) {
            this.eventRenderer.showByHash(state.affectedInstances);
            this.mirrorRenderer.unrender(this.context, state.segs, { isResizing: true, sourceSeg: state.sourceSeg });
        }
    };
    /* Selection
    ------------------------------------------------------------------------------------------------------------------*/
    // Renders a visual indication of a selection. Overrides the default, which was to simply render a highlight.
    TimeGrid.prototype._renderDateSelection = function (segs) {
        if (segs) {
            if (this.context.options.selectMirror) {
                this.mirrorRenderer.renderSegs(this.context, segs, { isSelecting: true });
            }
            else {
                this.fillRenderer.renderSegs('highlight', this.context, segs);
            }
        }
    };
    TimeGrid.prototype._unrenderDateSelection = function (segs) {
        if (segs) {
            if (this.context.options.selectMirror) {
                this.mirrorRenderer.unrender(this.context, segs, { isSelecting: true });
            }
            else {
                this.fillRenderer.unrender('highlight', this.context);
            }
        }
    };
    return TimeGrid;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["DateComponent"]));

var AllDaySplitter = /** @class */ (function (_super) {
    __extends(AllDaySplitter, _super);
    function AllDaySplitter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AllDaySplitter.prototype.getKeyInfo = function () {
        return {
            allDay: {},
            timed: {}
        };
    };
    AllDaySplitter.prototype.getKeysForDateSpan = function (dateSpan) {
        if (dateSpan.allDay) {
            return ['allDay'];
        }
        else {
            return ['timed'];
        }
    };
    AllDaySplitter.prototype.getKeysForEventDef = function (eventDef) {
        if (!eventDef.allDay) {
            return ['timed'];
        }
        else if (Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["hasBgRendering"])(eventDef)) {
            return ['timed', 'allDay'];
        }
        else {
            return ['allDay'];
        }
    };
    return AllDaySplitter;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["Splitter"]));

var TIMEGRID_ALL_DAY_EVENT_LIMIT = 5;
var WEEK_HEADER_FORMAT = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createFormatter"])({ week: 'short' });
/* An abstract class for all timegrid-related views. Displays one more columns with time slots running vertically.
----------------------------------------------------------------------------------------------------------------------*/
// Is a manager for the TimeGrid subcomponent and possibly the DayGrid subcomponent (if allDaySlot is on).
// Responsible for managing width/height.
var AbstractTimeGridView = /** @class */ (function (_super) {
    __extends(AbstractTimeGridView, _super);
    function AbstractTimeGridView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.splitter = new AllDaySplitter();
        _this.renderSkeleton = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(_this._renderSkeleton, _this._unrenderSkeleton);
        /* Header Render Methods
        ------------------------------------------------------------------------------------------------------------------*/
        // Generates the HTML that will go before the day-of week header cells
        _this.renderHeadIntroHtml = function () {
            var _a = _this.context, theme = _a.theme, dateEnv = _a.dateEnv, options = _a.options;
            var range = _this.props.dateProfile.renderRange;
            var dayCnt = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["diffDays"])(range.start, range.end);
            var weekText;
            if (options.weekNumbers) {
                weekText = dateEnv.format(range.start, WEEK_HEADER_FORMAT);
                return '' +
                    '<th class="fc-axis fc-week-number ' + theme.getClass('widgetHeader') + '" ' + _this.axisStyleAttr() + '>' +
                    Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["buildGotoAnchorHtml"])(// aside from link, important for matchCellWidths
                    options, dateEnv, { date: range.start, type: 'week', forceOff: dayCnt > 1 }, Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["htmlEscape"])(weekText) // inner HTML
                    ) +
                    '</th>';
            }
            else {
                return '<th class="fc-axis ' + theme.getClass('widgetHeader') + '" ' + _this.axisStyleAttr() + '></th>';
            }
        };
        /* Time Grid Render Methods
        ------------------------------------------------------------------------------------------------------------------*/
        // Generates the HTML that goes before the bg of the TimeGrid slot area. Long vertical column.
        _this.renderTimeGridBgIntroHtml = function () {
            var theme = _this.context.theme;
            return '<td class="fc-axis ' + theme.getClass('widgetContent') + '" ' + _this.axisStyleAttr() + '></td>';
        };
        // Generates the HTML that goes before all other types of cells.
        // Affects content-skeleton, mirror-skeleton, highlight-skeleton for both the time-grid and day-grid.
        _this.renderTimeGridIntroHtml = function () {
            return '<td class="fc-axis" ' + _this.axisStyleAttr() + '></td>';
        };
        /* Day Grid Render Methods
        ------------------------------------------------------------------------------------------------------------------*/
        // Generates the HTML that goes before the all-day cells
        _this.renderDayGridBgIntroHtml = function () {
            var _a = _this.context, theme = _a.theme, options = _a.options;
            return '' +
                '<td class="fc-axis ' + theme.getClass('widgetContent') + '" ' + _this.axisStyleAttr() + '>' +
                '<span>' + // needed for matchCellWidths
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["getAllDayHtml"])(options) +
                '</span>' +
                '</td>';
        };
        // Generates the HTML that goes before all other types of cells.
        // Affects content-skeleton, mirror-skeleton, highlight-skeleton for both the time-grid and day-grid.
        _this.renderDayGridIntroHtml = function () {
            return '<td class="fc-axis" ' + _this.axisStyleAttr() + '></td>';
        };
        return _this;
    }
    AbstractTimeGridView.prototype.render = function (props, context) {
        _super.prototype.render.call(this, props, context);
        this.renderSkeleton(context);
    };
    AbstractTimeGridView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.renderSkeleton.unrender();
    };
    AbstractTimeGridView.prototype._renderSkeleton = function (context) {
        this.el.classList.add('fc-timeGrid-view');
        this.el.innerHTML = this.renderSkeletonHtml();
        this.scroller = new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["ScrollComponent"]('hidden', // overflow x
        'auto' // overflow y
        );
        var timeGridWrapEl = this.scroller.el;
        this.el.querySelector('.fc-body > tr > td').appendChild(timeGridWrapEl);
        timeGridWrapEl.classList.add('fc-time-grid-container');
        var timeGridEl = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createElement"])('div', { className: 'fc-time-grid' });
        timeGridWrapEl.appendChild(timeGridEl);
        this.timeGrid = new TimeGrid(timeGridEl, {
            renderBgIntroHtml: this.renderTimeGridBgIntroHtml,
            renderIntroHtml: this.renderTimeGridIntroHtml
        });
        if (context.options.allDaySlot) { // should we display the "all-day" area?
            this.dayGrid = new _fullcalendar_daygrid__WEBPACK_IMPORTED_MODULE_1__["DayGrid"](// the all-day subcomponent of this view
            this.el.querySelector('.fc-day-grid'), {
                renderNumberIntroHtml: this.renderDayGridIntroHtml,
                renderBgIntroHtml: this.renderDayGridBgIntroHtml,
                renderIntroHtml: this.renderDayGridIntroHtml,
                colWeekNumbersVisible: false,
                cellWeekNumbersVisible: false
            });
            // have the day-grid extend it's coordinate area over the <hr> dividing the two grids
            var dividerEl = this.el.querySelector('.fc-divider');
            this.dayGrid.bottomCoordPadding = dividerEl.getBoundingClientRect().height;
        }
    };
    AbstractTimeGridView.prototype._unrenderSkeleton = function () {
        this.el.classList.remove('fc-timeGrid-view');
        this.timeGrid.destroy();
        if (this.dayGrid) {
            this.dayGrid.destroy();
        }
        this.scroller.destroy();
    };
    /* Rendering
    ------------------------------------------------------------------------------------------------------------------*/
    // Builds the HTML skeleton for the view.
    // The day-grid and time-grid components will render inside containers defined by this HTML.
    AbstractTimeGridView.prototype.renderSkeletonHtml = function () {
        var _a = this.context, theme = _a.theme, options = _a.options;
        return '' +
            '<table class="' + theme.getClass('tableGrid') + '">' +
            (options.columnHeader ?
                '<thead class="fc-head">' +
                    '<tr>' +
                    '<td class="fc-head-container ' + theme.getClass('widgetHeader') + '">&nbsp;</td>' +
                    '</tr>' +
                    '</thead>' :
                '') +
            '<tbody class="fc-body">' +
            '<tr>' +
            '<td class="' + theme.getClass('widgetContent') + '">' +
            (options.allDaySlot ?
                '<div class="fc-day-grid"></div>' +
                    '<hr class="fc-divider ' + theme.getClass('widgetHeader') + '" />' :
                '') +
            '</td>' +
            '</tr>' +
            '</tbody>' +
            '</table>';
    };
    /* Now Indicator
    ------------------------------------------------------------------------------------------------------------------*/
    AbstractTimeGridView.prototype.getNowIndicatorUnit = function () {
        return this.timeGrid.getNowIndicatorUnit();
    };
    // subclasses should implement
    // renderNowIndicator(date: DateMarker) {
    // }
    AbstractTimeGridView.prototype.unrenderNowIndicator = function () {
        this.timeGrid.unrenderNowIndicator();
    };
    /* Dimensions
    ------------------------------------------------------------------------------------------------------------------*/
    AbstractTimeGridView.prototype.updateSize = function (isResize, viewHeight, isAuto) {
        _super.prototype.updateSize.call(this, isResize, viewHeight, isAuto); // will call updateBaseSize. important that executes first
        this.timeGrid.updateSize(isResize);
        if (this.dayGrid) {
            this.dayGrid.updateSize(isResize);
        }
    };
    // Adjusts the vertical dimensions of the view to the specified values
    AbstractTimeGridView.prototype.updateBaseSize = function (isResize, viewHeight, isAuto) {
        var _this = this;
        var eventLimit;
        var scrollerHeight;
        var scrollbarWidths;
        // make all axis cells line up
        this.axisWidth = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["matchCellWidths"])(Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["findElements"])(this.el, '.fc-axis'));
        // hack to give the view some height prior to timeGrid's columns being rendered
        // TODO: separate setting height from scroller VS timeGrid.
        if (!this.timeGrid.colEls) {
            if (!isAuto) {
                scrollerHeight = this.computeScrollerHeight(viewHeight);
                this.scroller.setHeight(scrollerHeight);
            }
            return;
        }
        // set of fake row elements that must compensate when scroller has scrollbars
        var noScrollRowEls = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["findElements"])(this.el, '.fc-row').filter(function (node) {
            return !_this.scroller.el.contains(node);
        });
        // reset all dimensions back to the original state
        this.timeGrid.bottomRuleEl.style.display = 'none'; // will be shown later if this <hr> is necessary
        this.scroller.clear(); // sets height to 'auto' and clears overflow
        noScrollRowEls.forEach(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["uncompensateScroll"]);
        // limit number of events in the all-day area
        if (this.dayGrid) {
            this.dayGrid.removeSegPopover(); // kill the "more" popover if displayed
            eventLimit = this.context.options.eventLimit;
            if (eventLimit && typeof eventLimit !== 'number') {
                eventLimit = TIMEGRID_ALL_DAY_EVENT_LIMIT; // make sure "auto" goes to a real number
            }
            if (eventLimit) {
                this.dayGrid.limitRows(eventLimit);
            }
        }
        if (!isAuto) { // should we force dimensions of the scroll container?
            scrollerHeight = this.computeScrollerHeight(viewHeight);
            this.scroller.setHeight(scrollerHeight);
            scrollbarWidths = this.scroller.getScrollbarWidths();
            if (scrollbarWidths.left || scrollbarWidths.right) { // using scrollbars?
                // make the all-day and header rows lines up
                noScrollRowEls.forEach(function (rowEl) {
                    Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["compensateScroll"])(rowEl, scrollbarWidths);
                });
                // the scrollbar compensation might have changed text flow, which might affect height, so recalculate
                // and reapply the desired height to the scroller.
                scrollerHeight = this.computeScrollerHeight(viewHeight);
                this.scroller.setHeight(scrollerHeight);
            }
            // guarantees the same scrollbar widths
            this.scroller.lockOverflow(scrollbarWidths);
            // if there's any space below the slats, show the horizontal rule.
            // this won't cause any new overflow, because lockOverflow already called.
            if (this.timeGrid.getTotalSlatHeight() < scrollerHeight) {
                this.timeGrid.bottomRuleEl.style.display = '';
            }
        }
    };
    // given a desired total height of the view, returns what the height of the scroller should be
    AbstractTimeGridView.prototype.computeScrollerHeight = function (viewHeight) {
        return viewHeight -
            Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["subtractInnerElHeight"])(this.el, this.scroller.el); // everything that's NOT the scroller
    };
    /* Scroll
    ------------------------------------------------------------------------------------------------------------------*/
    // Computes the initial pre-configured scroll state prior to allowing the user to change it
    AbstractTimeGridView.prototype.computeDateScroll = function (duration) {
        var top = this.timeGrid.computeTimeTop(duration);
        // zoom can give weird floating-point values. rather scroll a little bit further
        top = Math.ceil(top);
        if (top) {
            top++; // to overcome top border that slots beyond the first have. looks better
        }
        return { top: top };
    };
    AbstractTimeGridView.prototype.queryDateScroll = function () {
        return { top: this.scroller.getScrollTop() };
    };
    AbstractTimeGridView.prototype.applyDateScroll = function (scroll) {
        if (scroll.top !== undefined) {
            this.scroller.setScrollTop(scroll.top);
        }
    };
    // Generates an HTML attribute string for setting the width of the axis, if it is known
    AbstractTimeGridView.prototype.axisStyleAttr = function () {
        if (this.axisWidth != null) {
            return 'style="width:' + this.axisWidth + 'px"';
        }
        return '';
    };
    return AbstractTimeGridView;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["View"]));
AbstractTimeGridView.prototype.usesMinMaxTime = true; // indicates that minTime/maxTime affects rendering

var SimpleTimeGrid = /** @class */ (function (_super) {
    __extends(SimpleTimeGrid, _super);
    function SimpleTimeGrid(timeGrid) {
        var _this = _super.call(this, timeGrid.el) || this;
        _this.buildDayRanges = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoize"])(buildDayRanges);
        _this.slicer = new TimeGridSlicer();
        _this.timeGrid = timeGrid;
        return _this;
    }
    SimpleTimeGrid.prototype.firstContext = function (context) {
        context.calendar.registerInteractiveComponent(this, {
            el: this.timeGrid.el
        });
    };
    SimpleTimeGrid.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.context.calendar.unregisterInteractiveComponent(this);
    };
    SimpleTimeGrid.prototype.render = function (props, context) {
        var dateEnv = this.context.dateEnv;
        var dateProfile = props.dateProfile, dayTable = props.dayTable;
        var dayRanges = this.dayRanges = this.buildDayRanges(dayTable, dateProfile, dateEnv);
        var timeGrid = this.timeGrid;
        timeGrid.receiveContext(context); // hack because context is used in sliceProps
        timeGrid.receiveProps(__assign({}, this.slicer.sliceProps(props, dateProfile, null, context.calendar, timeGrid, dayRanges), { dateProfile: dateProfile, cells: dayTable.cells[0] }), context);
    };
    SimpleTimeGrid.prototype.renderNowIndicator = function (date) {
        this.timeGrid.renderNowIndicator(this.slicer.sliceNowDate(date, this.timeGrid, this.dayRanges), date);
    };
    SimpleTimeGrid.prototype.buildPositionCaches = function () {
        this.timeGrid.buildPositionCaches();
    };
    SimpleTimeGrid.prototype.queryHit = function (positionLeft, positionTop) {
        var rawHit = this.timeGrid.positionToHit(positionLeft, positionTop);
        if (rawHit) {
            return {
                component: this.timeGrid,
                dateSpan: rawHit.dateSpan,
                dayEl: rawHit.dayEl,
                rect: {
                    left: rawHit.relativeRect.left,
                    right: rawHit.relativeRect.right,
                    top: rawHit.relativeRect.top,
                    bottom: rawHit.relativeRect.bottom
                },
                layer: 0
            };
        }
    };
    return SimpleTimeGrid;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["DateComponent"]));
function buildDayRanges(dayTable, dateProfile, dateEnv) {
    var ranges = [];
    for (var _i = 0, _a = dayTable.headerDates; _i < _a.length; _i++) {
        var date = _a[_i];
        ranges.push({
            start: dateEnv.add(date, dateProfile.minTime),
            end: dateEnv.add(date, dateProfile.maxTime)
        });
    }
    return ranges;
}
var TimeGridSlicer = /** @class */ (function (_super) {
    __extends(TimeGridSlicer, _super);
    function TimeGridSlicer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimeGridSlicer.prototype.sliceRange = function (range, dayRanges) {
        var segs = [];
        for (var col = 0; col < dayRanges.length; col++) {
            var segRange = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["intersectRanges"])(range, dayRanges[col]);
            if (segRange) {
                segs.push({
                    start: segRange.start,
                    end: segRange.end,
                    isStart: segRange.start.valueOf() === range.start.valueOf(),
                    isEnd: segRange.end.valueOf() === range.end.valueOf(),
                    col: col
                });
            }
        }
        return segs;
    };
    return TimeGridSlicer;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["Slicer"]));

var TimeGridView = /** @class */ (function (_super) {
    __extends(TimeGridView, _super);
    function TimeGridView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.buildDayTable = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoize"])(buildDayTable);
        return _this;
    }
    TimeGridView.prototype.render = function (props, context) {
        _super.prototype.render.call(this, props, context); // for flags for updateSize. also _renderSkeleton/_unrenderSkeleton
        var _a = this.props, dateProfile = _a.dateProfile, dateProfileGenerator = _a.dateProfileGenerator;
        var nextDayThreshold = context.nextDayThreshold;
        var dayTable = this.buildDayTable(dateProfile, dateProfileGenerator);
        var splitProps = this.splitter.splitProps(props);
        if (this.header) {
            this.header.receiveProps({
                dateProfile: dateProfile,
                dates: dayTable.headerDates,
                datesRepDistinctDays: true,
                renderIntroHtml: this.renderHeadIntroHtml
            }, context);
        }
        this.simpleTimeGrid.receiveProps(__assign({}, splitProps['timed'], { dateProfile: dateProfile,
            dayTable: dayTable }), context);
        if (this.simpleDayGrid) {
            this.simpleDayGrid.receiveProps(__assign({}, splitProps['allDay'], { dateProfile: dateProfile,
                dayTable: dayTable,
                nextDayThreshold: nextDayThreshold, isRigid: false }), context);
        }
        this.startNowIndicator(dateProfile, dateProfileGenerator);
    };
    TimeGridView.prototype._renderSkeleton = function (context) {
        _super.prototype._renderSkeleton.call(this, context);
        if (context.options.columnHeader) {
            this.header = new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["DayHeader"](this.el.querySelector('.fc-head-container'));
        }
        this.simpleTimeGrid = new SimpleTimeGrid(this.timeGrid);
        if (this.dayGrid) {
            this.simpleDayGrid = new _fullcalendar_daygrid__WEBPACK_IMPORTED_MODULE_1__["SimpleDayGrid"](this.dayGrid);
        }
    };
    TimeGridView.prototype._unrenderSkeleton = function () {
        _super.prototype._unrenderSkeleton.call(this);
        if (this.header) {
            this.header.destroy();
        }
        this.simpleTimeGrid.destroy();
        if (this.simpleDayGrid) {
            this.simpleDayGrid.destroy();
        }
    };
    TimeGridView.prototype.renderNowIndicator = function (date) {
        this.simpleTimeGrid.renderNowIndicator(date);
    };
    return TimeGridView;
}(AbstractTimeGridView));
function buildDayTable(dateProfile, dateProfileGenerator) {
    var daySeries = new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["DaySeries"](dateProfile.renderRange, dateProfileGenerator);
    return new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["DayTable"](daySeries, false);
}

var main = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createPlugin"])({
    defaultView: 'timeGridWeek',
    views: {
        timeGrid: {
            class: TimeGridView,
            allDaySlot: true,
            slotDuration: '00:30:00',
            slotEventOverlap: true // a bad name. confused with overlap/constraint system
        },
        timeGridDay: {
            type: 'timeGrid',
            duration: { days: 1 }
        },
        timeGridWeek: {
            type: 'timeGrid',
            duration: { weeks: 1 }
        }
    }
});

/* harmony default export */ __webpack_exports__["default"] = (main);



/***/ }),

/***/ "./node_modules/ng-fullcalendar/fesm5/ng-fullcalendar.js":
/*!***************************************************************!*\
  !*** ./node_modules/ng-fullcalendar/fesm5/ng-fullcalendar.js ***!
  \***************************************************************/
/*! exports provided: CalendarComponent, FullCalendarModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalendarComponent", function() { return CalendarComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FullCalendarModule", function() { return FullCalendarModule; });
/* harmony import */ var _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fullcalendar/core */ "./node_modules/@fullcalendar/core/main.esm.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");



/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CalendarComponent = /** @class */ (function () {
    function CalendarComponent(element) {
        this.element = element;
        this.initialized = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.eventClick = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.eventMouseEnter = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.eventMouseLeave = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.eventDragStart = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.eventDragStop = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.eventDrop = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.eventResizeStart = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.eventResizeStop = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.eventLeave = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.eventResize = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.eventResizableFromStart = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.allDayMaintainDuration = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.dragScroll = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.eventConstraint = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.eventReceive = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.drop = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.select = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.dateClick = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.clickButton = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.fullcalendarEvents = [
            'eventClick',
            'eventMouseEnter',
            'eventMouseLeave',
            'eventDragStart',
            'eventDragStop',
            'eventDrop',
            'eventResizeStart',
            'eventResizeStop',
            'eventLeave',
            'eventResize',
            'eventResizableFromStart',
            'allDayMaintainDuration',
            'dragScroll',
            'eventReceive',
            'drop',
            'select',
            'dateClick'
        ];
        this._reRender = true;
    }
    Object.defineProperty(CalendarComponent.prototype, "eventsModel", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            this._eventsModel = value;
            if (this._reRender) {
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.renderEvents(value);
                }), 50);
            }
            else {
                this._reRender = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CalendarComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    CalendarComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.updateOptions();
        this.calendar = new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["Calendar"](this.element.nativeElement, this.options);
        this.calendar.render();
        this.initialized.emit();
        this.element.nativeElement.addEventListener('click', (/**
         * @param {?} ev
         * @return {?}
         */
        function (ev) {
            /** @type {?} */
            var closest = ev.target.closest('button');
            if (closest) {
                /** @type {?} */
                var classnames = ev.srcElement.className.split(' ');
                classnames.forEach((/**
                 * @param {?} name
                 * @return {?}
                 */
                function (name) {
                    if (name.indexOf('button') === name.length - 6) {
                        name = name.replace(/fc|button|-/g, '');
                        if (name != '') {
                            _this.buttonEventDispatch(name);
                        }
                    }
                    else if (name.indexOf('chevron')) {
                        name = name.replace(/fc|icon|chevron|-/g, '');
                        switch (name) {
                            case 'right':
                                _this.buttonEventDispatch('next');
                                break;
                            case 'left':
                                _this.buttonEventDispatch('prev');
                                break;
                            default:
                                break;
                        }
                    }
                }));
            }
        }));
    };
    /**
     * @private
     * @param {?} buttonType
     * @return {?}
     */
    CalendarComponent.prototype.buttonEventDispatch = /**
     * @private
     * @param {?} buttonType
     * @return {?}
     */
    function (buttonType) {
        /** @type {?} */
        var currentDetail = {
            buttonType: buttonType,
            data: this.calendar.getDate()
        };
        this.clickButton.emit(currentDetail);
    };
    /**
     * @private
     * @return {?}
     */
    CalendarComponent.prototype.updateOptions = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.fullcalendarEvents.forEach((/**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            if (!_this.options[element]) {
                _this.options[element] = (/**
                 * @param {?} info
                 * @return {?}
                 */
                function (info) {
                    _this[element].emit(info);
                });
            }
        }));
    };
    /**
     * @private
     * @param {?} events
     * @return {?}
     */
    CalendarComponent.prototype.renderEvents = /**
     * @private
     * @param {?} events
     * @return {?}
     */
    function (events) {
        var _this = this;
        // https://fullcalendar.io/docs/Calendar-batchRendering
        if (events && events.length) {
            this.calendar.batchRendering((/**
             * @return {?}
             */
            function () {
                _this.calendar.removeAllEvents();
                events.forEach((/**
                 * @param {?} ev
                 * @return {?}
                 */
                function (ev) {
                    _this.calendar.addEvent(ev);
                }));
            }));
            this.calendar.rerenderEvents();
        }
    };
    CalendarComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'ng-fullcalendar',
                    template: ""
                }] }
    ];
    /** @nocollapse */
    CalendarComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] }
    ]; };
    CalendarComponent.propDecorators = {
        options: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        initialized: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        eventClick: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        eventMouseEnter: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        eventMouseLeave: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        eventDragStart: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        eventDragStop: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        eventDrop: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        eventResizeStart: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        eventResizeStop: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        eventLeave: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        eventResize: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        eventResizableFromStart: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        allDayMaintainDuration: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        dragScroll: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        eventConstraint: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        eventReceive: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        drop: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        select: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        dateClick: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        clickButton: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        eventsModel: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['eventsModel',] }]
    };
    return CalendarComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FullCalendarModule = /** @class */ (function () {
    function FullCalendarModule() {
    }
    FullCalendarModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    declarations: [CalendarComponent],
                    imports: [],
                    exports: [CalendarComponent]
                },] }
    ];
    return FullCalendarModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=ng-fullcalendar.js.map

/***/ })

}]);
//# sourceMappingURL=default~views-calendar-calendarlist-module~views-lead-lead-module~views-opportunity-opportunity-modu~f302c721.js.map