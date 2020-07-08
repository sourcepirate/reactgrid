var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { recalcVisibleRange, focusLocation } from '.';
import { defaultCellTemplates } from './defaultCellTemplates';
import { CellMatrixBuilder } from '../Model/CellMatrixBuilder';
export function getDerivedStateFromProps(props, state) {
    var stateDeriverWithProps = stateDeriver(props);
    state = stateDeriverWithProps(state)(updateStateProps);
    state = stateDeriverWithProps(state)(appendCellTemplatesAndHighlights);
    var hasChanged = dataHasChanged(props, state);
    if (hasChanged) {
        state = stateDeriverWithProps(state)(updateCellMatrix);
    }
    state = stateDeriverWithProps(state)(updateFocusedLocation);
    if (hasChanged) {
        state = stateDeriverWithProps(state)(updateVisibleRange);
    }
    state = stateDeriverWithProps(state)(setInitialFocusLocation);
    if (areFocusesDiff(props, state)) {
        state = stateDeriverWithProps(state)(setFocusLocation);
    }
    return state;
}
export var areFocusesDiff = function (props, state) {
    var _a, _b, _c, _d;
    return ((_a = props.focusLocation) === null || _a === void 0 ? void 0 : _a.columnId) !== ((_b = state.focusedLocation) === null || _b === void 0 ? void 0 : _b.column.columnId)
        || ((_c = props.focusLocation) === null || _c === void 0 ? void 0 : _c.rowId) !== ((_d = state.focusedLocation) === null || _d === void 0 ? void 0 : _d.row.rowId);
};
export var stateDeriver = function (props) { return function (state) { return function (fn) { return fn(props, state); }; }; };
export var dataHasChanged = function (props, state) { return !state.cellMatrix || props !== state.cellMatrix.props; };
export function updateStateProps(props, state) {
    if (state.props !== props) {
        state = __assign(__assign({}, state), { props: props });
    }
    return state;
}
function updateCellMatrix(props, state) {
    var builder = new CellMatrixBuilder();
    return __assign(__assign({}, state), { cellMatrix: builder.setProps(props).fillRowsAndCols().fillSticky().fillScrollableRange()
            .setEdgeLocations().getCellMatrix() });
}
export function updateFocusedLocation(props, state) {
    if (state.cellMatrix.columns.length > 0 && state.focusedLocation && !state.currentlyEditedCell) {
        state = __assign(__assign({}, state), { focusedLocation: state.cellMatrix.validateLocation(state.focusedLocation) });
    }
    return state;
}
function updateVisibleRange(props, state) {
    if (state.visibleRange) {
        state = recalcVisibleRange(state);
    }
    return state;
}
export function appendCellTemplatesAndHighlights(props, state) {
    var _a;
    return __assign(__assign({}, state), { highlightLocations: (_a = props.highlights) !== null && _a !== void 0 ? _a : [], cellTemplates: __assign(__assign({}, defaultCellTemplates), props.customCellTemplates) });
}
export function setInitialFocusLocation(props, state) {
    var locationToFocus = props.initialFocusLocation;
    if (locationToFocus && !state.focusedLocation) {
        return focusLocation(state, state.cellMatrix.getLocationById(locationToFocus.rowId, locationToFocus.columnId));
    }
    return state;
}
export function setFocusLocation(props, state) {
    var locationToFocus = props.focusLocation;
    if (locationToFocus) {
        var location_1 = state.cellMatrix.getLocationById(locationToFocus.rowId, locationToFocus.columnId);
        return focusLocation(state, location_1);
    }
    return state;
}