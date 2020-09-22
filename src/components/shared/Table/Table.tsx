import React from 'react'
import organizeData from '../../../Utils/organizeDataForTable'
import './Table.scss'

export interface TableHeader {
  key: string,
  value: string,
  right?: boolean
}

declare interface TableProps {
  headers: TableHeader[]
  data: any[]

  enableActions?: boolean

  onDelete?: (item: any) => void
  onDetail?: (item: any) => void
  onEdit?: (item: any) => void
}

const Table:React.FC<TableProps> = (props) => {
  const [organizedData, indexedHeaders] = organizeData(props.data, props.headers)
  return <table className="AppTable">
    <thead>
      <tr>
        {
          props.headers.map(header => 
            <th 
              className={ header.right ? 'right' : '' } 
              key={ header.key }>{ header.value }
            </th>
          )
        }
      </tr>
    </thead>
    <tbody>
      {
        organizedData.map((row, i) => {
          return <tr key={i}>
            {
              Object
                .keys(row)
                .map((item, i) => 
                  item !== '$original'
                  ? <td className={indexedHeaders[item].right ? 'right' : ''}
                      key={ row.$original.id + i }>
                      { row[item] }
                    </td>
                  : null
                  )
            }
          </tr>
        })
      }
    </tbody>
  </table>
}

export default Table;