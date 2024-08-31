import { Button, Input, useNumberInput, HStack } from '@chakra-ui/react';
import { useEffect } from 'react';

export const QuantityField = ({ index, amount, defaultVal = 1, onChanged, isCart = true, maxQty = 1 }) => {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps, valueAsNumber } =
        useNumberInput({
            step: 1,
            defaultValue: defaultVal,
            min: 1,
            max: maxQty
        })

    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps();

    useEffect(() => {
        onChanged(index, amount, valueAsNumber);
    }, [valueAsNumber]);


    return (
        <>
            {
                isCart ?
                    <HStack justify={'space-between'}>
                        <Button size={'sm'} rounded={12} bg={'#F5F3FB'} borderColor={'#695ACD'} variant={'outline'} {...dec}>-</Button>

                        <Input isReadOnly={true} textAlign={'center'} fontSize={'md'} borderWidth={0} {...input} />
                        <Button size={'sm'} rounded={12} bg={'#F5F3FB'} borderColor={'#695ACD'} variant={'outline'} {...inc}>+</Button>
                    </HStack> :
                    <HStack>
                        <Button size={'xs'} rounded={8} bg={'#F5F3FB'} borderColor={'#695ACD'} variant={'outline'} {...dec}>-</Button>
                        <Input isReadOnly={true} textAlign={'center'} fontSize={'md'} borderWidth={0} {...input} />
                        <Button size={'xs'} rounded={8} bg={'#F5F3FB'} borderColor={'#695ACD'} variant={'outline'} {...inc}>+</Button>
                    </HStack>
            }
        </>

    )
}
