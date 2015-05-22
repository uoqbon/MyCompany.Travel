﻿define(['services/enums', 'config', 'viewmodels/base'],
    function (enums, config, base) {
        var ListViewModel = function () {
            var source = ko.observableArray(),
            filter = ko.observable(''),
            throttledFilter = ko.computed(filter).extend({ throttle: 300 }),
            sourceItemsCount = ko.observable(0),
            pages = ko.observableArray(),
            pageSelected = 0,
            numPages = 0,
            getDataMethod = null,
            getDataCountMethod = null,
            getCustomParametersMethod = null;

            throttledFilter.subscribe(function () {
                refresh();
            });
            
            sourceItemsCount.subscribe(function (count) {
                calculatePaginator(count);
            }),
            anyRecord = ko.computed(function () {
                return source().length > 0;
            }, this);

            var vm = {
                initialize: initialize,
                source: source,
                sourceItemsCount: sourceItemsCount,
                refresh: refresh,
                filter: filter,
                pages: pages,
                paginate: paginate,
                nextPage: nextPage,
                previousPage: previousPage,
                anyRecord: anyRecord,
                removeSourceItem: removeSourceItem
            };

            return vm;

            function initialize(getData, getCount, getCustomParameters) {
                getDataMethod = getData;
                getDataCountMethod = getCount;
                getCustomParametersMethod = getCustomParameters;
            }

            function refresh() {
                pageSelected = 0;

                base.showLoading();

                return $.when(
                        getDataCount(),
                        getData())
                    .done(function (count) {
                        sourceItemsCount(count);
                        sourceItemsCount.valueHasMutated();
                        base.hideLoading();
                    });
            }

            function getData() {
                var parameters = {
                    filter: filter(),
                    pictureType: enums.pictureType.small,
                    pageSize: config.pageSize,
                    pageCount: pageSelected
                };

                base.showLoading();

                parameters = getCustomParametersMethod(parameters);

                return getDataMethod(parameters).then(function (data) {
                    source(data);
                    base.hideLoading();
                });
            }
            
            function getDataCount() {
                if (getDataCountMethod) {
                    var parameters = {
                        filter: filter()
                    };

                    parameters = getCustomParametersMethod(parameters);

                    return getDataCountMethod(parameters);
                }

                return 0;
            }

            function paginate(page) {
                pageSelected = page.number - 1;
                getData();
                calculatePaginator(sourceItemsCount());
            }

            function nextPage() {
                if (pageSelected == (numPages - 1)) return;

                pageSelected = pageSelected + 1;
                getData();
                calculatePaginator(sourceItemsCount());
            }

            function previousPage() {
                if (pageSelected == 0) return;

                pageSelected = pageSelected - 1;
                getData();
                calculatePaginator(sourceItemsCount());
            }

            function calculatePaginator(count) {
                pages.removeAll();
                numPages = Math.ceil(count / config.pageSize);
                var firstPage = Math.floor((pageSelected + 1) / 12) * 12;
                if (firstPage > 0)
                    firstPage = firstPage -2;

                for (var i = firstPage; i < firstPage + Math.min(12, numPages) && i < numPages ; i++) {
                    var isActive = pageSelected == i;
                    pages.push({ number: i + 1, activated: isActive, clickable: true });
                }

                if (numPages > 10 && pages()[pages().length - 1].number != numPages) {
                    pages.push({ number: "...", activated: false, clickable: false });
                    pages.push({ number: numPages, activated: false, clickable: true });
                }
            }

            function removeSourceItem(item) {
                if (source().length == 1) {
                    refresh();
                    return;
                }

                source.remove(item);
                var count = sourceItemsCount() - 1;
                sourceItemsCount(count);
            }
        };

        return {
            ListViewModel: ListViewModel
        };
    });