var __webkitAssign__$$watchers = '$$watchers', __webkitAssign__$$nextSibling = '$$nextSibling', __webkitAssign__$$childHead = '$$childHead', __webkitAssign__$$childTail = '$$childTail', __webkitAssign__$$listeners = '$$listeners', __webkitAssign__$$listenerCount = '$$listenerCount', __webkitAssign__$$watchersCount = '$$watchersCount', __webkitAssign__$id = '$id', __webkitAssign__$$ChildScope = '$$ChildScope', __webkitAssign__prototype = 'prototype';
function createChildScopeClass(parent) {
    function ChildScope() {
        this[__webkitAssign__$$watchers] = this[__webkitAssign__$$nextSibling] = this[__webkitAssign__$$childHead] = this[__webkitAssign__$$childTail] = null;
        this[__webkitAssign__$$listeners] = {};
        this[__webkitAssign__$$listenerCount] = {};
        this[__webkitAssign__$$watchersCount] = 0;
        this[__webkitAssign__$id] = nextUid();
        this[__webkitAssign__$$ChildScope] = null;
    }
    ChildScope[__webkitAssign__prototype] = parent;
    return ChildScope;
}
