import React from 'react';
import { Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import "./css/default.css";
import { Box, HStack, Text } from '@chakra-ui/react';

const formatAmount = (amount, currency, digit = 0) => {
    let unit = "";
    let value = amount / 1000;
    if (value > 0 && value < 1) {
        value = amount;
    }
    else if (value >= 1 && value < 1000) {
        value = amount / 1000;
        unit = "K";
    }
    else if (value >= 1000 && value < 1000000) {
        value = amount / 1000000;
        unit = "M";
    }
    else if (value >= 1000000) {
        value = amount / 1000000000;
        unit = "B";
    }

    const result = Intl.NumberFormat('en-US', {
        maximumFractionDigits: digit
    }).format(value) + unit;

    return currency === 'USD' ? `$${result}` : result;
}

export function SimplePie({ data = [], dataTooltipLabel = "", dataCurrency = "", showLegend = false, xHeight = 40, title = "" }) {
    const COLORS = ['#9BDFC4', '#F99BAB', '#D66406', '#A539C0', '#C08939', '#FF8042'];
    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 1.3;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <g>
                <text x={x} y={y} fill="black" style={{ fontSize: "11px", fontWeight: 600 }} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {`${formatAmount(data[index].value)} `}
                </text>
                <text x={x} y={y} dy={14} fill="#777777" style={{ fontSize: "10px", fontWeight: 600 }} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {`(${(percent * 100).toFixed(1)}%)`}
                </text>
            </g>

        );
    };

    const renderLegend = (props) => {
        const { payload } = props;

        return (
            <span>
                <HStack>
                    {
                        payload.map((entry, index) => (
                            <HStack spacing={1}>
                                <Box w={2} h={1} bg={COLORS[index]}>
                                </Box>
                                <Text fontSize={"10px"} key={`item-${index}`}>{entry.value}</Text>
                            </HStack>
                        ))
                    }
                </HStack>
            </span>
        );
    }

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{payload[0].name}</p>
                    <p className="intro"><b>{Intl.NumberFormat('en-US').format(payload[0].value)} {dataCurrency}</b></p>
                </div>
            );
        }

        return null;
    };
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Legend content={renderLegend} layout="horizontal" verticalAlign="top" align="right" />
                <Pie
                    dataKey="value"
                    isAnimationActive={true}
                    data={data}
                    cx="50%"
                    cy="43%"
                    fill="#8884d8"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={85}
                    innerRadius={60}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
            </PieChart>
        </ResponsiveContainer>
    );
}