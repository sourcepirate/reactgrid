import { State, Location } from '../Model';
export declare type FocusLocationFn = (state: State, location: Location) => State;
export declare type FocusCellFn = (colIdx: number, rowIdx: number, state: State) => State;
export declare type RowCalcFn = (state: State, location: Location) => number;
export declare const focusCell: (colIdx: number, rowIdx: number, state: State) => State;
export declare const moveFocusLeft: (state: State) => State;
export declare const moveFocusRight: (state: State) => State;
export declare const moveFocusUp: (state: State) => State;
export declare const moveFocusDown: (state: State) => State;
export declare const moveFocusPage: (rowCalculator: RowCalcFn) => (state: State) => State<import("../Model").CellMatrix<import("../Model").StickyRanges, import("../Model").CellMatrixProps>, import("../Model").Behavior>;
export declare const moveFocusPageUp: (state: State) => State<import("../Model").CellMatrix<import("../Model").StickyRanges, import("../Model").CellMatrixProps>, import("../Model").Behavior>;
export declare const moveFocusPageDown: (state: State) => State<import("../Model").CellMatrix<import("../Model").StickyRanges, import("../Model").CellMatrixProps>, import("../Model").Behavior>;
export declare function withFocusLocation(focusLocation: FocusLocationFn): (colIdx: number, rowIdx: number, state: State) => State;
export declare function withMoveFocusLeft(fc: FocusCellFn): (state: State) => State;
export declare function withMoveFocusRight(fc: FocusCellFn): (state: State) => State;
export declare function withMoveFocusUp(fc: FocusCellFn): (state: State) => State;
export declare function withMoveFocusDown(fc: FocusCellFn): (state: State) => State;
export declare function withMoveFocusPage(fc: FocusCellFn): (rowCalculator: RowCalcFn) => (state: State) => State<import("../Model").CellMatrix<import("../Model").StickyRanges, import("../Model").CellMatrixProps>, import("../Model").Behavior>;
export declare function getVisibleHeight(state: State, stickyHeight: number): number;
