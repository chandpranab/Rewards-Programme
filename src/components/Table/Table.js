import { useMemo } from 'react';
import './styles.scss';


const Table = ({ columns, data, loading, totalRow, totalCondition }) => {
  const formattedData = useMemo(() => {
    if (!totalCondition) {
      return data;
    }
    let lastIndex = 0;
    const result = data?.reduce((acc, item, index) => {
      if (totalCondition(item, data[index + 1])) {
        const row = totalRow(data.slice(lastIndex, index + 1));
        lastIndex = index;
        return [
          ...acc,
          item, {
            ...row,
            id: `total-${item.id}`,
            isTotal: true,
          }];
      }
      return [...acc, item];
    }, []);
    result?.push({
      ...totalRow(data.slice(lastIndex + 1)),
      id: `total-table`,
      isTotal: true,
    });
    return result;
  }, [data, totalCondition, totalRow]);

  return (
    <table className='table-default' data-testid="table">
      <thead>
        <tr data-testid="table-header-row">
          {columns.map((column) => (
            <th key={column.title}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody data-testid="table-body">
        {!loading && formattedData?.map((row) => (
          <tr data-testid="table-row" key={row.id} className={`${row.isTotal ? 'total-tr' : ''}`}>
            {
              columns.map((column) => (
                <td key={column.title}>
                  {
                    column.renderer
                      ? column.renderer(row[column.accessor], row)
                      : row[column.accessor]
                  }
                </td>
              ))
            }
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table;
