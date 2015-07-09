function createChildScopeClass(parent) {
    function ChildScope() {
        this.$$watchers = this.$$nextSibling =
            this.$$childHead = this.$$childTail = null;
        this.$$listeners = {};
        this.$$listenerCount = {};
        this.$$watchersCount = 0;
        this.$id = nextUid();
        this.$$ChildScope = null;
    }
    ChildScope.prototype = parent;
    return ChildScope;
}
