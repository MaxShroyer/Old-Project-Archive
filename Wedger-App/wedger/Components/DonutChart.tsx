import { ColorValue, StyleSheet, View } from "react-native";
import React from "react";
import { SharedValue, useDerivedValue } from "react-native-reanimated";
import { Canvas, Path, SkFont, Skia, Text,} from "@shopify/react-native-skia";
import DonutPath from "./DonutPath";

type Props = {
    radius: number;
    strokeWidth: number;
    outerStrokeWidth: number;
    font: SkFont | any;
    smallFont: SkFont | any;
    totalValue: SharedValue<number>;
    totalSpent: SharedValue<number>;
    n: number;
    gap: number;
    decimals: SharedValue<number[]>;
    colors: any;
};



const DonutChart = ({
    radius,
    strokeWidth,
    outerStrokeWidth,
    font,
    smallFont,
    totalValue,
    totalSpent,
    n,
    gap,
    decimals,
    colors,

}: Props) => {
    const array = Array.from({length: n});
    const innerRadius = radius - outerStrokeWidth / 2;
    const path = Skia.Path.Make();
    path.addCircle(radius, radius, innerRadius)
    
    const targetText = useDerivedValue(
        () => 
            `$${Math.round(totalSpent.value)}`,
        [],
    );

    const fontSize = font.measureText('$00');
    const smallFontSize = smallFont.measureText('Total Spent');

    const textX = useDerivedValue(() => {
        const fontSize = font.measureText(targetText.value);
        return radius - fontSize.width / 2
    });

    return (
        <View style={styles.container}>
            <Canvas style={styles.container}>
                <Path 
                path={path} 
                color='#f4f7fc'  //#EBF8FE or #f4f7fc or #7FB5C1 or #FBFBF9
                style="stroke" 
                strokeWidth={outerStrokeWidth}
                strokeJoin='round'
                strokeCap='round'
                start={0}
                end={1}
                />
                {array.map((_, index) => {
                  return (
                    <DonutPath 
                        key={index} 
                        radius={radius} 
                        strokeWidth={strokeWidth} 
                        outerStrokeWidth={outerStrokeWidth} 
                        color={colors[index]} 
                        decimals={decimals} 
                        index={index}
                        gap={gap} 
                    />
                  );
                })}
                <Text
                    x ={radius - smallFontSize.width / 2}
                    y={radius + smallFontSize.height / 2 - fontSize.height / 1.2}
                    text={"Total Spent"} 
                    font={smallFont} 
                    color='black'
                />
                <Text
                    x ={textX}
                    y={radius + fontSize.height / 1}
                    text={targetText} 
                    font={font} 
                    color='black'
                />
            </Canvas>
        </View>
    );
};

export default DonutChart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})