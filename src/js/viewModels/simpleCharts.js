define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojselectcombobox', 'ojs/ojchart', 'ojs/ojinputtext', 'ojs/ojlabel', 'ojs/ojselectcombobox'],
        function (oj, ko, $) {

            function SimpleChartsViewModel() {
                var self = this;

                self.chartType = ko.observable("bar");



                self.stackValue = ko.observable('off');
                self.orientationValue = ko.observable('vertical');

                self.header = [];
                self.headerCombo = [];
                self.series = [];
                self.splitedData = [];
                self.columns = [];

                self.barSeries = ko.observableArray([]);
                self.barGroups = ko.observableArray([]);


                self.hiddenCategories = ko.observableArray([]);

                self.inputData = 'prenom\\tMath\\tPhysics\\tProgramming\\tnom\\tjava\\nbadr\\t2\\t3\\t4\\tezzir\\t10\\nwafae\\t8\\t7\\t6\\tabder\\t2';

                self.coordinateSystem = ko.observable('cartesian');

                self.selectedItems = [];

                self.groupDetection = ko.observable("automatic");

                self.selectedGroups = [];

                self.getColumnValues = function (matrix, n) {
                    return matrix.map(function (value, index) {
                        return value[n];
                    });
                };

                self.splitData = function (inputData) {
                    var rows = self.inputData.split(/\\n/);

                    self.splitedData = [];
                    self.series = [];
                    self.header = [];
                    self.headerCombo = [];

                    for (var i = 0; i < rows.length; i++) {
                        self.splitedData[i] = rows[i].split(/\\t/);

                        if (i > 0)
                            self.series.push({items: rows[i].split(/\\t/)});
                    }

                    if (self.splitedData.length > 0) {
                        self.header = self.splitedData[0];
                        var matrix = self.splitedData;
                        for (var i = 0; i < self.header.length; i++) {
                            self.headerCombo.push({id: i + 1, label: self.header[i]});
                            self.columns[i] = self.getColumnValues(matrix, i);
                        }
                    }
                };

                self.getGroups = function () {

                    var headerLgth = self.header.length;

                    var headerAfter = [];
                    self.series = [];
                    self.groups = [];

                    for (var i = 0; i < self.columns.length; i++) {
                        var serieLabel = "";
                        var serieItem = [];
                        for (var j = 0; j < self.columns[i].length; j++) {

                            if (isNumber(self.columns[i][j])) {
                                serieItem.push(self.columns[i][j]);
                            } else {
                                if (j === 0) {
                                    serieLabel += self.columns[i][j] + " ";
                                }

                                if (j > 0) {
                                    if (headerAfter[j - 1]) {
                                        headerAfter[j - 1] += " " + self.columns[i][j];
                                    } else {
                                        headerAfter[j - 1] = self.columns[i][j];
                                    }
                                }

                            }
                        }
                        if (serieItem.length > 0) {
                            self.series.push({name: serieLabel, items: serieItem});
                        }
                    }

                    self.barSeries(self.series);
                    self.barGroups(headerAfter);
                };


                self.parseData = function (event) {
                    self.splitData(self.inputData);
                    self.getGroups();
                };

                self.parseData();


                self.selectionListener = function (event) {

                };

                //check if variable is numeric
                function isNumber(n) {
                    return !isNaN(parseFloat(n)) && isFinite(n);
                }
                ;

                self.submitGroups = function (event) {
                    for (var i = 0; i < self.selectedGroups.length; i++) {
                        self.selectedGroups[i] = self.selectedGroups[i] - 1;
                    }

                    self.customGroups();
                };
                self.customGroups = function () {
                    var headerLgth = self.header.length;

                    var headerAfter = [];
                    self.series = [];
                    self.groups = [];

                    for (var i = 0; i < self.columns.length; i++) {
                        var serieLabel = "";
                        var serieItem = [];
                        for (var j = 0; j < self.columns[i].length; j++) {

                            if (self.selectedGroups.indexOf(i) === -1 && isNumber(self.columns[i][j])) {
                                serieItem.push(self.columns[i][j]);
                            } else if (self.selectedGroups.indexOf(i) >= 0) {


                                if (j > 0) {
                                    if (headerAfter[j - 1]) {
                                        headerAfter[j - 1] += " " + self.columns[i][j];
                                    } else {
                                        headerAfter[j - 1] = self.columns[i][j];
                                    }
                                }
                            } else if (j === 0) {
                                serieLabel += self.columns[i][j] + " ";

                            }
                        }

                        if (self.selectedGroups.indexOf(i) === -1 && serieItem.length > 0) {
                            self.series.push({name: serieLabel, items: serieItem});
                        }

                    }

                    console.log(self.series);
                    self.barSeries(self.series);
                    self.barGroups(headerAfter);
                };
            }

            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constructed
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new SimpleChartsViewModel();
        }
);
