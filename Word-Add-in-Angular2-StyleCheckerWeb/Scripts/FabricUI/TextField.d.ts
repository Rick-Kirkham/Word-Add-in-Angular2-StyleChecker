declare namespace fabric {
    /**
     * Text Field Plugin
     *
     * Adds basic demonstration functionality to .ms-TextField components.
     */
    class TextField {
        private _container;
        private _textField;
        private _textFieldLabel;
        private _type;
        /**
         *
         * @param {HTMLDivElement} container - the target container for an instance of TextField
         * @constructor
         */
        constructor(container: HTMLElement);
        /** Populate _type with various kinds of text fields */
        private _setTextFieldType();
        /** Add event listeners according to the type(s) of text field */
        private _addListeners();
    }
}
