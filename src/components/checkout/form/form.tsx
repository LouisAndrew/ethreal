import React from 'react';

import { useForm, FormProvider } from 'react-hook-form';

import { Box, Flex } from 'rebass';

import { UserData, UserLocation } from '../checkout';
import Message from './message';
import Details from './details';

type Props = {
    getUserData: (data: UserData & UserLocation, origin: number) => void;
};

const Form: React.FC<Props> = ({ getUserData }) => {
    const methods = useForm();
    const { handleSubmit } = methods;

    // const allProvinces = allCities.map(cityItem => ({
    //     value: cityItem.provinceId,
    //     label: cityItem.provinceName,
    // }));

    const submit = (data: any) => {
        // const userData: UserData & UserLocation = {
        //     cityId: get(data, 'city.value', 0),
        //     provinceId: get(data, 'province.value', 0),
        //     name: 'Jane Doe',
        //     email: 'Jane.doe@email.email',
        //     address: 'Storkowerstrasse',
        //     phone: 1231432123,
        //     postal: 213456,
        // };

        // getUserData(userData, originCity.cityId);
        console.log(data);
    };

    return (
        <FormProvider {...methods}>
            <Box as="form" onSubmit={handleSubmit(submit)} px={[4]}>
                <Flex
                    flexDirection={['column', 'column', 'row-reverse']}
                    mt={[0, 0, 2]}
                    px={[4, 4, 9, 10]}
                    justifyContent="space-between"
                >
                    <Message />
                    <Details />
                </Flex>
            </Box>
        </FormProvider>
    );
};

export { Form };
