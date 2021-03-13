
//檢測並安裝Apexchart

window.Promise ||
        document.write(
          '<script src="https://cdn.jsdelivr.net/npm/promise-polyfill@8/dist/polyfill.min.js"><\/script>'
        )
      window.Promise ||
        document.write(
          '<script src="https://cdn.jsdelivr.net/npm/eligrey-classlist-js-polyfill@1.2.20171210/classList.min.js"><\/script>'
        )
      window.Promise ||
        document.write(
          '<script src="https://cdn.jsdelivr.net/npm/findindex_polyfill_mdn"><\/script>'
        )





var options = {
          series: [{
            name: "ETH / CT",
            data: [0.001020618557, 0.001034599633, 0.001045210911, 0.001053778214, 0.001060971239, 0.001067175749, 0.001072634449, 0.00107751006 ,0.001081917054],
        }],
          chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'credit token price (ETH/CT)',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xaxis: {
          categories: ['MAR,13', 'MAR,14', 'MAR,15', 'MAR,16', 'MAR,17', 'MAR,18', 'MAR,19', 'MAR,20', 'MAR,21'],
        }
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();