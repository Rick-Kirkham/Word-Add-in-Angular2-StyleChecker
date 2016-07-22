/**
 * @namespace fabric
 */
declare namespace fabric {
    /**
     * MessageBanner component
     *
     * A component to display error messages
     *
     */
    class MessageBanner {
        container: HTMLElement;
        private _clipper;
        private _bufferSize;
        private _textContainerMaxWidth;
        private _clientWidth;
        private _textWidth;
        private _initTextWidth;
        private _chevronButton;
        private _errorBanner;
        private _actionButton;
        private _closeButton;
        private _bufferElementsWidth;
        private _bufferElementsWidthSmall;
        private SMALL_BREAK_POINT;
        /**
         *
         * @param {HTMLElement} container - the target container for an instance of MessageBanner
         * @constructor
         */
        constructor(container: HTMLElement);
        /**
         * initializes component
         */
        init(): void;
        /**
         * shows banner if the banner is hidden
         */
        showBanner(): void;
        /**
         * sets styles on resize
         */
        private _onResize();
        /**
         * resize above 480 pixel breakpoint
         */
        private _resizeRegular();
        /**
         * resize below 480 pixel breakpoint
         */
        private _resizeSmall();
        /**
         * caches elements and values of the component
         */
        private _cacheDOM();
        /**
         * expands component to show full error message
         */
        private _expand();
        /**
         * collapses component to only show truncated message
         */
        private _collapse();
        private _toggleExpansion();
        private _hideMessageBanner();
        /**
         * hides banner when close button is clicked
         */
        private _hideBanner();
        /**
         * sets handlers for resize and button click events
         */
        private _setListeners();
    }
}
