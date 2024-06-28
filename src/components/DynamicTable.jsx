import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'antd';

const DynamicTable = () => {
  const columns = useSelector(state => state.table.columns);
  const dataSource = useSelector(state => state.table.dataSource);

  const memoizedColumns = useMemo(() => columns, [columns]);
  const memoizedDataSource = useMemo(() => dataSource, [dataSource]);

  const rowHeaderColumn = useMemo(() => ({
    title: 'Row Header',
    dataIndex: 'rowHeader',
    fixed: 'left',
    width: 150,
    render: (_, record) => ({
      children: record.key,
      props: {
        style: {
          fontWeight: record.style?.fontWeight,
          fontStyle: record.style?.fontStyle,
          textAlign: record.style?.textAlign,
          fontSize: record.style?.fontSize,
          writingMode: record.style?.writingMode,
        },
      },
    }),
  }), []);

  const combinedColumns = useMemo(() => {
    const mappedColumns = memoizedColumns.map(column => ({
      ...column,
      dataIndex: column.key,
      render: (_, record) => record[column.key],
    }));
    return [rowHeaderColumn, ...mappedColumns];
  }, [memoizedColumns, rowHeaderColumn]);

  const memoizedRenderDataSource = useMemo(() => {
    return memoizedDataSource.map((record, index) => ({
      ...record,
      key: `row-${index}`, 
      rowHeader: record.key, 
      style: {
        fontWeight: record.style?.fontWeight,
        fontStyle: record.style?.fontStyle,
        textAlign: record.style?.textAlign,
        fontSize: record.style?.fontSize,
        writingMode: record.style?.writingMode,
      },
    }));
  }, [memoizedDataSource]);

  return (
    <Table
      columns={combinedColumns}
      dataSource={memoizedRenderDataSource}
      bordered
      pagination={false}
      rowClassName={(record) => ({
        fontWeight: record.style?.fontWeight,
        fontStyle: record.style?.fontStyle,
        textAlign: record.style?.textAlign,
        fontSize: record.style?.fontSize,
        writingMode: record.style?.writingMode,
      })}
      onRow={(record) => ({
        style: {
          fontWeight: record.style?.fontWeight,
          fontStyle: record.style?.fontStyle,
          textAlign: record.style?.textAlign,
          fontSize: record.style?.fontSize,
          writingMode: record.style?.writingMode,
        }
      })}
    />
  );
};

export default DynamicTable;
