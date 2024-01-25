import TableContainer from "components/Common/TableContainer"
import { get } from "helpers/api_helper"
import React, { useEffect, useMemo, useState } from "react"

const Date = cell => {
  console.log("celll", cell)
  return cell.value ? cell.value.slice(0, 10) : ""
}

const DataTable = props => {
  const { node } = props

  console.log(node, "Node for table data")
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    fetchNodesData()
  }, [node])

  const fetchNodesData = async () => {
    try {
      const response = await get(`data/latest-readings/node/${node}`)
      setTableData(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const columns = useMemo(
    () => [
      {
        Header: "Created At",
        accessor: "created_at",
        Cell: cellProps => {
          return <Date {...cellProps} />
        },
      },
      {
        Header: "Node Id",
        accessor: "node_id",
      },
      {
        Header: "Name",
        accessor: "name",
      },

      {
        Header: "Dust",
        accessor: "dust",
      },
      {
        Header: "CO",
        accessor: "co",
      },
      {
        Header: "CO2",
        accessor: "co2",
      },
      {
        Header: "NO2",
        accessor: "no2",
      },
      {
        Header: "CH4",
        accessor: "ch4",
      },
      {
        Header: "NH3",
        accessor: "nh3",
      },
      {
        Header: "PM1.0",
        accessor: "pm_one",
      },
      {
        Header: "PM10",
        accessor: "pm_ten",
      },
      {
        Header: "Humid",
        accessor: "humid",
      },
      {
        Header: "Temp",
        accessor: "temp",
      },
      {
        Header: "lat",
        accessor: "lat",
      },
      {
        Header: "lng",
        accessor: "lng",
      },
    ],
    []
  )

  return (
    <div>
      <TableContainer
        columns={columns}
        data={tableData}
        isGlobalFilter={false}
        isAddOptions={false}
        customPageSize={10}
        className="custom-header-css"
      />
    </div>
  )
}

export default DataTable
