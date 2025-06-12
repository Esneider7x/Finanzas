import * as React from 'react';
import {DataGrid,  GridColDef} from '@mui/x-data-grid';
import {Paper, IconButton, Box} from '@mui/material';
import {esES} from '@mui/x-data-grid/locales';
import EdidIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


interface DinamicTableProps {
    rows: any[];
    columns: GridColDef[];
    onEdit: (row: any) => void;
    onDelete: (id: number) => void;
}

const DinamicTable: React.FC<DinamicTableProps> = ({rows, columns, onEdit, onDelete}) => {

    const [tablaRows, setTableRows] = React.useState<[]>([]);
    
    React.useEffect(() => {
        setTableRows(rows);
    },[rows])

    const columnasBotones: GridColDef[] = [
        ...columns,
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 150,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: any) => (
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <IconButton 
                        color='primary' 
                        onClick={() => {
                            console.log('Edit clicked for:', params.row);
                            onEdit(params.row);
                        }}
                        sx={{ 
                            backgroundColor: 'rgba(25, 118, 210, 0.1)',
                            '&:hover': { 
                                backgroundColor: 'rgba(25, 118, 210, 0.2)',
                                transform: 'scale(1.1)',
                                boxShadow: '0 4px 8px rgba(25, 118, 210, 0.3)'
                            },
                            transition: 'all 0.3s ease',
                            borderRadius: '8px',
                            width: 36,
                            height: 36
                        }}
                    >
                        <EdidIcon fontSize="small" />
                    </IconButton>

                    <IconButton 
                        onClick={() => {
                            console.log('Delete clicked for ID:', params.row.id);
                            onDelete(params.row.id);
                        }}
                        sx={{ 
                            backgroundColor: 'rgba(211, 47, 47, 0.1)',
                            color: '#d32f2f',
                            '&:hover': { 
                                backgroundColor: 'rgba(211, 47, 47, 0.2)',
                                transform: 'scale(1.1)',
                                boxShadow: '0 4px 8px rgba(211, 47, 47, 0.3)'
                            },
                            transition: 'all 0.3s ease',
                            borderRadius: '8px',
                            width: 36,
                            height: 36
                        }}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Box>
            ),
        },
    ]

return (
    <Box sx={{ 
        height: '100%', 
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    }}>
        <Paper 
            elevation={12}
            sx={{ 
                height: '100%',
                width: '100%',
                flex: 1,
                borderRadius: '16px',
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 12px 40px 0 rgba(0, 0, 0, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                display: 'flex',
                flexDirection: 'column'
            }} 
            role="region" 
            aria-label="Tabla dinámica"
        >
            <DataGrid
                rows={rows}
                columns={columnasBotones}
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                initialState={{ 
                    pagination: { paginationModel: { pageSize: 10, page: 0 } },
                    columns: {
                        columnVisibilityModel: {
                            actions: true
                        }
                    }
                }}
                pageSizeOptions={[5, 10, 20, 50]}
                checkboxSelection
                disableRowSelectionOnClick
                sx={{ 
                    border: 0,
                    height: '100%',
                    '& .MuiDataGrid-main': {
                        borderRadius: '16px',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        borderBottom: 'none',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontWeight: 'bold',
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                    },
                    '& .MuiDataGrid-columnSeparator': {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    '& .MuiDataGrid-row': {
                        '&:nth-of-type(odd)': {
                            backgroundColor: 'rgba(102, 126, 234, 0.03)',
                        },
                        '&:nth-of-type(even)': {
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        },
                        '&:hover': {
                            backgroundColor: 'rgba(102, 126, 234, 0.1)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 20px rgba(102, 126, 234, 0.2)',
                            transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                            '& .MuiDataGrid-cell': {
                                color: '#333'
                            }
                        }
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: '1px solid rgba(102, 126, 234, 0.1)',
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: '#444',
                        display: 'flex',
                        alignItems: 'center'
                    },
                    '& .MuiDataGrid-footerContainer': {
                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                        borderTop: '2px solid rgba(102, 126, 234, 0.2)',
                        color: '#667eea',
                        fontWeight: 600
                    },
                    '& .MuiTablePagination-root': {
                        color: '#667eea',
                        fontWeight: 600
                    },
                    '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                        fontWeight: 600
                    },
                    '& .MuiCheckbox-root': {
                        color: '#667eea',
                        '&.Mui-checked': {
                            color: '#667eea',
                        },
                        '&:hover': {
                            backgroundColor: 'rgba(102, 126, 234, 0.1)'
                        }
                    },
                    '& .MuiDataGrid-selectedRowCount': {
                        color: '#667eea',
                        fontWeight: 700,
                        textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                    },
                    '& .MuiDataGrid-menuIcon': {
                        color: 'white'
                    },
                    '& .MuiDataGrid-sortIcon': {
                        color: 'white'
                    }
                }}
            />
        </Paper>
    </Box>
);
}

export default DinamicTable;