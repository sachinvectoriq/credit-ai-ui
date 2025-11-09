// src/shared/components/data-display/DataTable.tsx

import type { TableData, TableColumn, TableRow } from '@/types/financial.types';
import { formatValue } from '@/shared/utils/formatters';
import { cn } from '@/shared/utils/cn';

interface DataTableProps {
  columns: TableColumn[];
  rows: TableRow[];
  caption?: string;
  zebraStripe?: boolean;
  highlightOnHover?: boolean;
  className?: string;
}

export function DataTable({
  columns,
  rows,
  caption,
  zebraStripe = false,
  highlightOnHover = true,
  className,
}: DataTableProps) {
  if (!rows || rows.length === 0) {
    return (
      <div className="card p-8 text-center">
        <p className="text-slate-500">No data available</p>
      </div>
    );
  }

  return (
    <div className={cn('table-container', className)}>
      {caption && (
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200">
          <h3 className="text-sm font-semibold text-slate-700">{caption}</h3>
        </div>
      )}
      
      <table className={cn('table', zebraStripe && 'table-zebra')}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th 
                key={col.key}
                className={cn(
                  col.type === 'currency' || col.type === 'number' || col.type === 'percentage' || col.type === 'ratio'
                    ? 'text-right'
                    : 'text-left'
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        
        <tbody>
          {rows.map((row, idx) => (
            <tr 
              key={idx}
              className={cn(highlightOnHover && 'hover:bg-slate-50')}
            >
              {columns.map((col) => {
                const value = row[col.key];
                const isNegative = typeof value === 'number' && value < 0;
                
                return (
                  <td 
                    key={col.key}
                    className={cn(
                      col.type === 'currency' || col.type === 'number' || col.type === 'percentage' || col.type === 'ratio'
                        ? 'text-right font-mono'
                        : 'text-left',
                      isNegative && 'text-red-600',
                      col.key === 'item' && 'font-medium text-slate-700'
                    )}
                  >
                    {col.formatter 
                      ? col.formatter(value)
                      : formatValue(value, col.type)
                    }
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Wrapper for TableData type (includes metadata)
interface FinancialTableProps {
  data: TableData;
  zebraStripe?: boolean;
  highlightOnHover?: boolean;
  className?: string;
}

export function FinancialTable({ 
  data, 
  zebraStripe = true,
  highlightOnHover = true,
  className 
}: FinancialTableProps) {
  const { columns, rows, metadata } = data;
  
  // Build caption from metadata
  let caption = '';
  if (metadata) {
    const { period, currency, unit } = metadata;
    const parts: string[] = [];
    
    if (period) {
      parts.push(`${period.quarter} ${period.year}`);
    }
    
    if (unit) {
      parts.push(`in ${unit}`);
    }
    
    if (currency) {
      parts.push(currency);
    }
    
    caption = parts.join(' • ');
  }
  
  return (
    <DataTable
      columns={columns}
      rows={rows}
      caption={caption}
      zebraStripe={zebraStripe}
      highlightOnHover={highlightOnHover}
      className={className}
    />
  );
}