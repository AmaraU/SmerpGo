import { MaterialReactTable, MRT_ToggleFiltersButton, MRT_ToggleFullScreenButton } from 'material-react-table';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Center, Stack, Text } from '@chakra-ui/react';
import { download, mkConfig, generateCsv } from 'export-to-csv';
import { IconButton } from '@mui/material';
import { BiArrowBack } from 'react-icons/bi';
import { PiDownloadSimple } from 'react-icons/pi';

const Table = ({ data = [], columns = [], initSortFields = [], isLoading = false, tableHeader = "", noDataText = "", noDataTextSize = "sm", backAction = null, enableTopToolbar = false, fileName = "data", columnHeaderFontSize = "12px", rowFontSize = "12px", showHideColumns = {}, pgSize = 10, density = "comfortable", enableRowsPerPage = true, enableColumnResizing = false }) => {
    const theme = createTheme({

    });

    const csvOptions = mkConfig({
        fieldSeparator: ',',
        filename: fileName,
        quoteCharacter: '"',
        quoteStrings: true,
        decimalSeparator: '.',
        showLabels: true,
        useBom: true,
        useKeysAsHeaders: false,
        columnHeaders: columns.map((c) => ({ key: c.accessorKey, displayLabel: c.header }))
    });

    const handleExportData = () => {
        const csv = generateCsv(csvOptions)(data);
        download(csvOptions)(csv);
    };

    return (
        <ThemeProvider theme={theme}>
            <MaterialReactTable
                columns={columns}
                data={data ?? []}
                enableHiding={false}
                enableColumnResizing={enableColumnResizing}
                columnResizeMode='onChange'
                enableColumnActions={true}
                enableColumnFilters={true}
                enablePagination={true}
                enableSorting={true}
                enableStickyHeader={true}
                enableBottomToolbar={true}
                enableTopToolbar={enableTopToolbar}
                muiTableBodyRowProps={{ hover: true }}
                enableColumnFilterModes={false}
                enableColumnOrdering={false}
                enableGrouping={false}
                enablePinning={false}
                enableRowActions={false}
                enableRowSelection={false}
                enableDensityToggle={false}
                enableFullScreenToggle={true}
                enableFilterMatchHighlighting={false}
                positionGlobalFilter="left"
                muiSearchTextFieldProps={{
                    placeholder: "Search",
                    size: "small",
                    variant: 'outlined',
                }}
                muiTableProps={{
                    sx: {
                        tableLayout: 'fixed',
                        fontSize: '10px'
                    },
                }}
                muiTableHeadCellProps={{
                    sx: {
                        fontSize: columnHeaderFontSize,
                        color: '#666666',
                        fontWeight: 600,
                        backgroundColor: "#F6F6FF"
                    },
                }}
                muiTableBodyCellProps={{
                    sx: {
                        fontSize: rowFontSize
                    },
                }}
                muiTableHeadCellFilterTextFieldProps={{
                    placeholder: '',
                    sx: {
                        fontSize: '12px'
                    },
                }}
                state={{ showProgressBars: isLoading, showSkeletons: isLoading }}
                muiLinearProgressProps={({ isTopToolbar }) => ({
                    sx: {
                        display: isTopToolbar ? 'block' : 'none',
                    },
                })}
                initialState={{
                    density: density,
                    pagination: {
                        pageIndex: 0,
                        pageSize: pgSize
                    },
                    sorting: initSortFields,
                    showGlobalFilter: true,
                    columnVisibility: showHideColumns
                }}
                renderTopToolbarCustomActions={({ table }) => (
                    <Stack direction={'row'}>
                        {backAction ? <IconButton onClick={backAction}><BiArrowBack /></IconButton> : ''}
                        <Box ml={1.5} pt={1}>
                            <Text fontSize={'xl'} fontWeight={500}>{tableHeader}</Text>
                        </Box>
                    </Stack>
                )}
                renderToolbarInternalActions={({ table }) => (
                    <>
                        <IconButton onClick={handleExportData}>
                            <PiDownloadSimple />
                        </IconButton>
                        <MRT_ToggleFiltersButton table={table} />
                        <MRT_ToggleFullScreenButton table={table} />
                    </>

                )}
                renderEmptyRowsFallback={({ table }) => (
                    <Center py={6}>
                        <Text fontSize={noDataTextSize} color={'gray.500'}>{noDataText}</Text>
                    </Center>
                )}
                paginationDisplayMode="default"
                muiPaginationProps={{
                    color: 'secondary',
                    shape: 'circular',
                    variant: 'outlined',
                    size: 'small',
                    showRowsPerPage: enableRowsPerPage,
                }}
                muiFilterTextFieldProps={{
                    placeholder: "",
                    size: 'small',
                    sx: {
                        fontSize: '8px'
                    }
                }}
            />

        </ThemeProvider>
    );
};

export default Table;

