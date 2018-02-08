
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojchart', 'ojs/ojtoolbar'],
        function (oj, ko, $) {

            function ComplexChartsViewModel() {
                var self = this;

                self.low = -1;
                self.q1 = -1;
                self.q2 = -1;
                self.q3 = -1;
                self.high = -1;
                self.columns = [];
                self.cols = [];
                self.alpha = [];
                self.numeric = [];

                self.items = [];
                self.series = [];

                self.inputData = 'nom\\tlow\\tq1\\tq2\\tq3\\thigh\\tx1\\ty1\\tx2\\ty2\\nbadr\\t1\\t2\\t3\\t4\\t5\\t6\\t7\\t8\\t9\\nyahya\\t1\\t3\\t5\\t7\\t10\\t20\\t7\\t3\\t11';



                var boxPlotSeries = [
                    {name: "Series 1", items: [
                            {low: 3, q1: 8, q2: 12, q3: 17, high: 28, items: [40, 50]},
                            {low: 21, q1: 24, q2: 36, q3: 44, high: 65, items: [15]},
                            {low: 7, q1: 16, q2: 23, q3: 32, high: 49},
                            {low: 8, q1: 12, q2: 16, q3: 27, high: 49, items: [61]}
                        ]},
                    {name: "Series 2", items: [
                            {low: 12, q1: 17, q2: 21, q3: 24, high: 35},
                            {low: 5, q1: 14, q2: 24, q3: 31, high: 47},
                            {low: 26, q1: 37, q2: 48, q3: 52, high: 71, items: [9, 12, 78]},
                            {low: 10, q1: 14, q2: 37, q3: 50, high: 58}
                        ]}
                ];
                var boxPlotGroups = [
//                    "Group A", "Group B", "Group C", "Group D"
                ];

                self.boxPlotSeriesValue = ko.observableArray([]);
                self.boxPlotGroupsValue = ko.observableArray([]);

                /* toggle buttons */
                self.orientationValue = ko.observable('vertical');

                self.splitData = function () {
                    var rows = self.inputData.split(/\\n/);

                    self.splitedData = [];
                    self.series = [];
                    self.header = [];
                    self.headerCombo = [];

                    for (var i = 0; i < rows.length; i++) {
                        self.splitedData[i] = rows[i].split(/\\t/);

                    }

                    if (self.splitedData.length > 0) {
                        self.header = self.splitedData[0];
                        var matrix = self.splitedData;
                        for (var i = 0; i < self.header.length; i++) {
                            self.headerCombo.push({id: i, label: self.header[i]});
                            self.columns[i] = self.getColumnValues(matrix, i);
                            self.cols[i] = [...self.columns[i]];
                            self.cols[i].shift();
                        }
                    }
                }

                self.parseData = function (event) {
//                    for (var i = 0; i < self.header.length; i++) {
//                        if (self.header[i].toLowerCase() === "low") {
//                            self.low = i;
//                        } else if (self.header[i].toLowerCase() === "q1") {
//                            self.q1 = i;
//                        } else if (self.header[i].toLowerCase() === "q2") {
//                            self.q2 = i;
//                        } else if (self.header[i].toLowerCase() === "q3") {
//                            self.q3 = i;
//                        } else if (self.header[i].toLowerCase() === "high") {
//                            self.high = i;
//                        } else if (!self.cols[i].some(isNaN)) {  // la colonne est numerique
//                            self.numeric.push(i);
//                        } else {
//                            self.alpha.push(i);
//                        }
//                        ;
//                    }

                    for (var i = 1; i < self.splitedData.length; i++) {
                        var item = {};
                        self.numeric = [];
                        self.alpha = [];
                        for (var j = 0; j < self.splitedData[i].length; j++) {
                            
                            if (self.header[j].toLowerCase() === "low") {
                                item["low"] = self.splitedData[i][j];
                            } else if (self.header[j].toLowerCase() === "q1") {
                                item["q1"] = self.splitedData[i][j];
                            } else if (self.header[j].toLowerCase() === "q2") {
                                item["q2"] = self.splitedData[i][j];
                            } else if (self.header[j].toLowerCase() === "q3") {
                                item["q3"] = self.splitedData[i][j];
                            } else if (self.header[j].toLowerCase() === "high") {
                                item["high"] = self.splitedData[i][j];
                            } else if (!self.cols[j].some(isNaN)) {  // la colonne est numerique
                                
                                self.numeric.push(self.splitedData[i][j]);
                            } else {
                                self.alpha.push(self.splitedData[i][j]);
                            }
                        }
                        
                        item["items"] = self.numeric;
                        if (!self.items[self.alpha.join(" ")]) {

                            self.items[self.alpha.join(" ")] = [];
                        }
                        
                        self.items[self.alpha.join(" ")].push(item);

                    }
                    
                    for (key in self.items) {
                        
                        self.series.push({name: key, items: self.items[key]})
                    }
                    
                    console.log(self.series);
                    console.log(boxPlotSeries)
                    self.boxPlotSeriesValue(self.series);
                    
                };



                self.getColumnValues = function (matrix, n) {
                    return matrix.map(function (value, index) {
                        return value[n];
                    });
                };

                self.splitData();
                self.parseData();









                // Below are a subset of the ViewModel methods invoked by the ojModule binding
                // Please reference the ojModule jsDoc for additional available methods.

                /**
                 * Optional ViewModel method invoked when this ViewModel is about to be
                 * used for the View transition.  The application can put data fetch logic
                 * here that can return a Promise which will delay the handleAttached function
                 * call below until the Promise is resolved.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
                 * the promise is resolved
                 */
                self.handleActivated = function (info) {
                    // Implement if needed
                };

                /**
                 * Optional ViewModel method invoked after the View is inserted into the
                 * document DOM.  The application can put logic that requires the DOM being
                 * attached here.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
                 */
                self.handleAttached = function (info) {
                    // Implement if needed
                };


                /**
                 * Optional ViewModel method invoked after the bindings are applied on this View.
                 * If the current View is retrieved from cache, the bindings will not be re-applied
                 * and this callback will not be invoked.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 */
                self.handleBindingsApplied = function (info) {
                    // Implement if needed
                };

                /*
                 * Optional ViewModel method invoked after the View is removed from the
                 * document DOM.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
                 */
                self.handleDetached = function (info) {
                    // Implement if needed
                };
            }

            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constructed
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new ComplexChartsViewModel();
        }
);