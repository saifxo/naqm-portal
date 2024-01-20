import React, { useEffect, useState } from "react"
import { Card, CardBody, CardHeader, Table } from "reactstrap"
import styles from "./Home.module.css"
import { get } from "helpers/api_helper"

const PollutionTable = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchTableData()
  }, [])

  const fetchTableData = async () => {
    try {
      const response = await get("data/latest-readings")
      console.log(response.data, "Latest Readings")
      setData(response.data)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Card className={styles.cardContainer}>
      <CardHeader className={styles.headerTable}>
        NUST- Locations Air Pullution Level
      </CardHeader>
      <CardBody>
        <div className="table-responsive">
          <Table className="table mb-0">
            <thead>
              <tr>
                <th className={styles.column1}>Locations</th>
                <th>Status</th>
                <th>AQI-NUST</th>
                <th>PM2.5</th>
                <th>CO2</th>
                <th>Temp</th>
                <th>Humid</th>
              </tr>
            </thead>
            <tbody>
              {data.map(node => (
                <tr key={node.node_id}>
                  <th className={styles.column1} scope="row">
                    {node.name}
                  </th>
                  <td className={styles.dangerText}>{node.status}</td>
                  <td>{node.aqi}</td>
                  <td>{node.dust}</td>
                  <td>{node.co2}</td>
                  <td>{node.temp}</td>
                  <td>{node.humid}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  )
}

export default PollutionTable