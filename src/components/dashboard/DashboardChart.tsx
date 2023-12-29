// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/line
import {ResponsiveLine} from '@nivo/line'
import useTheme from "../../api/theme.ts";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const data = [
    {
        "id": "Letzter Monat",
        "color": "hsl(245, 58%, 51%)",
        "data": [
            {"x": 1, "y": Math.floor(Math.random() * 41)},
            {"x": 2, "y": Math.floor(Math.random() * 41)},
            {"x": 3, "y": Math.floor(Math.random() * 41)},
            {"x": 4, "y": Math.floor(Math.random() * 41)},
            {"x": 5, "y": Math.floor(Math.random() * 41)},
            {"x": 6, "y": Math.floor(Math.random() * 41)},
            {"x": 7, "y": Math.floor(Math.random() * 41)},
            {"x": 8, "y": Math.floor(Math.random() * 41)},
            {"x": 9, "y": Math.floor(Math.random() * 41)},
            {"x": 10, "y": Math.floor(Math.random() * 41)},
            {"x": 11, "y": Math.floor(Math.random() * 41)},
            {"x": 12, "y": Math.floor(Math.random() * 41)},
            {"x": 13, "y": Math.floor(Math.random() * 41)},
            {"x": 14, "y": Math.floor(Math.random() * 41)},
            {"x": 15, "y": Math.floor(Math.random() * 41)},
            {"x": 16, "y": Math.floor(Math.random() * 41)},
            {"x": 17, "y": Math.floor(Math.random() * 41)},
            {"x": 18, "y": Math.floor(Math.random() * 41)},
            {"x": 19, "y": Math.floor(Math.random() * 41)},
            {"x": 20, "y": Math.floor(Math.random() * 41)},
            {"x": 21, "y": Math.floor(Math.random() * 41)},
            {"x": 22, "y": Math.floor(Math.random() * 41)},
            {"x": 23, "y": Math.floor(Math.random() * 41)},
            {"x": 24, "y": Math.floor(Math.random() * 41)},
            {"x": 25, "y": Math.floor(Math.random() * 41)},
            {"x": 26, "y": Math.floor(Math.random() * 41)},
            {"x": 27, "y": Math.floor(Math.random() * 41)},
            {"x": 28, "y": Math.floor(Math.random() * 41)},
            {"x": 29, "y": Math.floor(Math.random() * 41)},
            {"x": 30, "y": Math.floor(Math.random() * 41)},
            {"x": 31, "y": Math.floor(Math.random() * 41)},
        ]
    },
    {
        "id": "Aktueller Monat",
        "color": "#8e86df",
        "data": [
            {"x": 1, "y": Math.floor(Math.random() * 41)},
            {"x": 2, "y": Math.floor(Math.random() * 41)},
            {"x": 3, "y": Math.floor(Math.random() * 41)},
            {"x": 4, "y": Math.floor(Math.random() * 41)},
            {"x": 5, "y": Math.floor(Math.random() * 41)},
            {"x": 6, "y": Math.floor(Math.random() * 41)},
            {"x": 7, "y": Math.floor(Math.random() * 41)},
            {"x": 8, "y": Math.floor(Math.random() * 41)},
            {"x": 9, "y": Math.floor(Math.random() * 41)},
            {"x": 10, "y": Math.floor(Math.random() * 41)},
            {"x": 11, "y": Math.floor(Math.random() * 41)},
            {"x": 12, "y": Math.floor(Math.random() * 41)},
            {"x": 13, "y": Math.floor(Math.random() * 41)},
            {"x": 14, "y": Math.floor(Math.random() * 41)},
            {"x": 15, "y": Math.floor(Math.random() * 41)},
            {"x": 16, "y": Math.floor(Math.random() * 41)},
            {"x": 17, "y": Math.floor(Math.random() * 41)},
            {"x": 18, "y": Math.floor(Math.random() * 41)},
            {"x": 19, "y": Math.floor(Math.random() * 41)},
            {"x": 20, "y": Math.floor(Math.random() * 41)},
            {"x": 21, "y": Math.floor(Math.random() * 41)},
            {"x": 22, "y": Math.floor(Math.random() * 41)},
            {"x": 23, "y": Math.floor(Math.random() * 41)},
            {"x": 24, "y": Math.floor(Math.random() * 41)},
            {"x": 25, "y": Math.floor(Math.random() * 41)},
            {"x": 26, "y": Math.floor(Math.random() * 41)},
            {"x": 27, "y": Math.floor(Math.random() * 41)},
            {"x": 28, "y": Math.floor(Math.random() * 41)},
            {"x": 29, "y": Math.floor(Math.random() * 41)},
            {"x": 30, "y": Math.floor(Math.random() * 41)},
            {"x": 31, "y": Math.floor(Math.random() * 41)},
        ]
    }
]
const DashboardChart = () => {
    const theme = useTheme()

    return (
        <ResponsiveLine
            data={data}
            margin={{top: 50, right: 30, bottom: 50, left: 60}}
            xScale={{type: 'point'}}
            yScale={{
                type: 'linear',
                max: 'auto',
                stacked: true,
                reverse: false
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
            }}
            enableArea={true}
            useMesh={false}
            enablePoints={false}
            enableGridX={false}
            enableGridY={false}
            colors={['#BDBDBD', theme.color]}
            legends={[
                {
                    anchor: 'top',
                    direction: 'row',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 120,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    )
}
export default DashboardChart;