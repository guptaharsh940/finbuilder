'use client'
import React, { useState } from 'react'
import  TransactionForm  from '../components/TransactionForm'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import TransactionTable from '../components/TransactionTable'
const Yourdata = () => {
    const [formVisible, setFormVisible] = useState(false);
    return (

        <div>
            <Card className='m-5'>
                <CardHeader>
                    <div className='flex items-center justify-center'>
                    <CardTitle>Add Transaction</CardTitle>
                    <Button variant="ghost" className='ml-auto' onClick={()=>setFormVisible(!formVisible)}>{formVisible?(<p>Hide</p>):(<p>Show</p>) }</Button>
                    </div>
                    <CardDescription>Add a new debit or credit transaction</CardDescription>
                </CardHeader>
                {
                    formVisible &&
                    (<CardContent>

                    <TransactionForm />
                </CardContent>)
                }
            </Card>
            <Card className='m-5'>
                <CardHeader>
                    <CardTitle>All Transaction</CardTitle>
                    <CardDescription>All your transactions are as below</CardDescription>
                </CardHeader>
                <CardContent>
                    
            <TransactionTable/>
                </CardContent>
                </Card>

        </div>
    )
}

export default Yourdata