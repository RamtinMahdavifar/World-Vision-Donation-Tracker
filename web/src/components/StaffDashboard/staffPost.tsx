import React from 'react';


import {useForm} from 'react-hook-form';


const StaffPost = () => {

    const {register, handleSubmit, reset} = useForm();


    const onSubmitStaffPost = (dataStaffPost: any)=> {
        // used to handle post request for staff account
        const data = {
            "userId": dataStaffPost.userId,
            "firstName": dataStaffPost.firstName,
            "middleName": dataStaffPost.middleName,
            "lastName": dataStaffPost.lastName,
            "homeAddress": {
                "street": dataStaffPost.street,
                "city": dataStaffPost.city,
                "province": dataStaffPost.province,
                "postalCode": dataStaffPost.postalCode,
                "country": dataStaffPost.country
            }
        };

        fetch('http://localhost:5000/api/staff', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });



        resetForm(dataStaffPost)

    }



    function resetForm(data: any) {

        console.log(data)
        // reset return info
        for (var key in data) {
            data[key] =""
        }
        reset({});

    }


    return (

        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <h2>Create New Staff Account</h2>
            <p>Enter staff personal details</p>

            <form onSubmit={handleSubmit(onSubmitStaffPost)}>
                <input type ="text" placeholder="userId" {...register("userId") } required />
                <input type ="text" placeholder="firstName" {...register("firstName")} required/>
                <input type ="text" placeholder="middleName" {...register("middleName")} required/>
                <input type ="text" placeholder="lastName" {...register("lastName")}required />
                <br/>
                <br/>
                <p>Enter staff home address</p>
                <br/>
                <input type ="text" placeholder="buildingNumber" {...register("buildingNumber")} required/>
                <input type ="text" placeholder="street" {...register("street")} required/>
                <input type ="text" placeholder="city" {...register("city")} required />
                <input type ="text" placeholder="province" {...register("province")} required/>
                <input type ="text" placeholder="postalCode" {...register("postalCode")}required />
                <input type ="text" placeholder="country" {...register("country")} required />
                <br/>
                <br/>
                <input type="submit" />
            </form>

            <br/>
            <br/>

        </div>
    )


}


export default StaffPost;
