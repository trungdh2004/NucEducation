import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

const CategoryHeader = () => {
  return (
    <div className='flex items-center justify-between mb-2'>
        <div>
            <Input placeholder='Tìm kiếm...'/>
        </div>
        <div>
            <Button>Thêm môn</Button>
        </div>
    </div>
  )
}

export default CategoryHeader