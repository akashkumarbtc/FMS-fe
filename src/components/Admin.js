import React from "react";
import "../css/accounts.css";
import { Pie, Line, Bar, defaults, canvas } from 'react-chartjs-2'
import wavingHand from "../assets/wavingHand.png";
import accountsSettings from "../assets/accountsSettings.png";
import { height } from "@mui/system";
import { useState, useEffect } from "react";
import axios from "../api/axios";


defaults.global.tooltips.enabled = true
defaults.global.legend.position = 'bottom'

const Admin = () => {
  const data = localStorage.getItem("auth");
  const token = JSON.parse(data).accessToken;
  const [clientMonthlyRevue, setClientMonthlyRevenue] = useState("")
  const [teamChartValue, setTeamChartValue] = useState("")
  const [clientNames, setClientName] = useState("")
  const [clientRevenue, setClientRevenue] = useState("")

  useEffect(()=>{
     getTeamPieChart()
     getClientPieChart()
    //  getMonthlyRevenue()
  },[])

  const getTeamPieChart = async() => {
    
    const url = "/admin/team-memeber-piegraph";
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        withCredentials: true,
      });
      setTeamChartValue([response.data.techteam, response.data.opperations, response.data.accounts])
    } catch (err) {
      console.log(err);
    }
  }
  const getClientPieChart = async() => {
    debugger
    const url = "/admin/client-revenue-piegraph";
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        withCredentials: true,
      });
      setClientName(Object.keys(response.data))
      setClientRevenue(Object.values(response.data))
    } catch (err) {
      console.log(err);
    }
  }
  const getMonthlyRevenue = async(year) => {
    
    const url = "/admin/monthly-revenue";
    try {
      const response = await axios.post(url, 
        JSON.stringify({
          year: year
        }),
        {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        withCredentials: true,
      });
      setClientMonthlyRevenue([response.data.January, response.data.February, response.data.March, response.data.April, response.data.May, response.data.June, response.data.July, response.data.August, response.data.September, response.data.October, response.data.November, response.data.December])
      console.log(clientMonthlyRevue)
    } catch (err) {
      console.log(err);
    }
  }


  const pieData = (canvas) => {
    var coloR = [];

    var dynamicColors = function() {
       var r = Math.floor(Math.random() * 255);
       var g = Math.floor(Math.random() * 255);
       var b = Math.floor(Math.random() * 255);
       return "rgb(" + r + "," + g + "," + b + ")";
    };
  
    for (var i in teamChartValue) {
       coloR.push(dynamicColors());
    }
    // const ctx = canvas.getContext("2d");
    // const gradient = ctx.createLinearGradient(0, 180, 180, 0);
    // const gradient1 = ctx.createLinearGradient(0, 180, 180, 0);
    // gradient.addColorStop(0.5, '#FDB400');
    // gradient.addColorStop(1, '#D6A42B');

    // gradient1.addColorStop(0.5, '#F75775');
    // gradient1.addColorStop(1, '#9E2037');
    // gradient1.addColorStop(1, '#F75775');

    return {
        labels: ['Tech Team', 'Operation Team', 'Accounts Team'],
        datasets:[
            {
            label: 'Data',
            // data: [10,12,8],
            data: teamChartValue,
            backgroundColor: coloR,
            borderColor: coloR,
            borderWidth: 1,
            }
        ]
    }
}
const pieOptions = {
    responsive: true,
    legend: {
      display: true
   },
    maintainAspectRatio: false,
    pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
    }
}
const pieDataClient = (canvas) => {
  var coloR = [];

  var dynamicColors = function() {
     var r = Math.floor(Math.random() * 255);
     var g = Math.floor(Math.random() * 255);
     var b = Math.floor(Math.random() * 255);
     return "rgb(" + r + "," + g + "," + b + ")";
  };

  for (var i in clientNames) {
     coloR.push(dynamicColors());
  }

  // const ctx = canvas.getContext("2d");
  // const gradient = ctx.createLinearGradient(0, 180, 180, 0);
  // const gradient1 = ctx.createLinearGradient(0, 180, 180, 0);
  // gradient.addColorStop(0.5, '#FDB400');
  // gradient.addColorStop(1, '#D6A42B');

  // gradient1.addColorStop(0.5, '#F75775');
  // gradient1.addColorStop(1, '#9E2037');
  // gradient1.addColorStop(1, '#F75775');

  return {
      labels: clientNames,
      datasets:[
          {
          label: 'Data',
          data: clientRevenue,
          backgroundColor: coloR,
          // borderColor: [gradient1, gradient],
          borderWidth: 1,
          }
      ]
  }
}
const pieOptionsCLient = {
  responsive: true,
  legend: {
    display: true
 },
  maintainAspectRatio: false,
  pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
      }
  }
}

const barData = (canvas) => {
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, 0, 316);
  // const gradient1 = ctx.createLinearGradient(0, 180, 180, 0);
  gradient.addColorStop(0, '#FDB400');
  gradient.addColorStop(0.25, '#FB8E30');
  gradient.addColorStop(0.50, '#F75775');
  gradient.addColorStop(0.75, '#8C3A60');
  gradient.addColorStop(1, '#051134');

  // gradient1.addColorStop(0, '#B7F8DB');
  // gradient1.addColorStop(0.5, '#50A7C2');
  // gradient1.addColorStop(1, '#B7F8DB');

  return {
          labels: ['January', "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
          datasets: [{
            label: 'My First Dataset',
            // data: clientMonthlyRevue,
            data:[400000, 2500000, 3500000, 3200000, 2100000, 1500000, 1700000, 3900000, 1200000, 1800000, 2400000, 3200000],
            backgroundColor: gradient,
            borderColor: gradient,
            fill: true,
          }]
  }
}
const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  tooltips: {
      mode: 'index',
      intersect: false,
  },
  hover: {
      mode: 'nearest',
      intersect: true
  },
  scales: {
      xAxes: [{
        gridLines: {
          display: false
        },
        ticks:{
          display: true
        }
      }],
      yAxes: [{
        gridLines: {
          display: false
        },
        min: 20,
        max: 100,
        ticks: {
            // maxTicksLimit: 20,
            // minTicketLimit: 20
        }
      }],
  },
  legend: {
      display: false,
      position: 'bottom',
      labels: {
          fontColor: 'rgba(242, 38, 19, 1)'
      }
  },
//   tooltips: {
//     callbacks: {
//        label: function(tooltipItem) {
//               return tooltipItem.yLabel;
//        }
//     }
// }
}

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div
        className="wrapper"
        style={{ padding: "17px", height: "100vh", background: "#F5F5F5" }}
      >
        <div className="container-fluid" style={{ height: "100vh" }}>
         <div className="main-header">
            <div className="admin-header">
              <div>
                <h3 className="welcome-name">Hi, Ankur</h3>
                <h2 className="welcome-text">Welcome back!</h2>
              </div>
              <img className="waving" src={wavingHand} alt="wavingHand" />
            </div>
            <div className="userSetting">
              <img
                className="user-image"
                src={accountsSettings}
                alt="accountsSettings"
              />
              <div>
                <h3 className="account-name">Ankur Gupta</h3>
                <h5 className="account-role">Accounts</h5>
              </div>
            </div>
          </div>
        <div className="row" style={{display:'flex'}}>
            <div className="col-sm-4 piechartwrapper">
              <div className="pieheadercontainer">
              <label className="piecharttext">Employee Distribution</label>
              {/* <div className="pielabelcontainer">
                <small className="pietechteam">Tech Team</small>
                <small className="pieoperationteam">Operation Team</small>
                <small className="pieoperationteam">Account Team</small>
              </div> */}
              </div>
              <Pie data={pieData} options={pieOptions} height={200} width={200} />
            </div>
            <div className="col-sm-4 linechartwrapper">
            <label className="linecharttext">Clients Revenue</label>
            <Pie data={pieDataClient} options={pieOptionsCLient} height={200} width={200}/>
            </div>
        </div>
        <div className="row mt-2">
          <div className="col-sm-4 barchartwrapper">
            <div className="bartextcontainer">
              <div className="barcharttextwrapper" style={{marginBottom:'10px'}}>
              <label className="barcharttext">Revenue Graph</label>
              <label className="barcharttext" style={{textAlign:"center"}}>Monthly Representation</label>
              <div className="barcharttext yearselectoption">
              <select name="department" id="department" className="barchartselect barcharttext" onChange={(e)=>getMonthlyRevenue(e.target.value)}>
                <option value="select">Select</option>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
              </div>
              </div>
              <Bar data={barData} options={barOptions} height={200} width={200}/>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
