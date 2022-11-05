import React from 'react';
import CommonLayout from '@/components/Layout/CommonLayout';
import Header from '@/components/Header';
import CategoryButton from '@/components/Button/CategoryButton';
export default function AllSubject() {
  return (
    <CommonLayout>
        <Header title="课程评价"></Header>
        <div className="space-y-2 mt-4">
        <div className="flex space-x-2">
          <CategoryButton color="red"></CategoryButton>
          <CategoryButton color="blue"></CategoryButton>
        </div>
        <div className="flex space-x-2">
          <CategoryButton color="yellow"></CategoryButton>
          <CategoryButton color="green"></CategoryButton>
        </div>
        <div className="flex space-x-2">
          <CategoryButton color="pink"></CategoryButton>
          <CategoryButton color="purple"></CategoryButton>
        </div>
        <div className="flex space-x-2">
          <CategoryButton color="red"></CategoryButton>
          <CategoryButton color="blue"></CategoryButton>
        </div>
        <div className="flex space-x-2">
          <CategoryButton color="yellow"></CategoryButton>
          <CategoryButton color="green"></CategoryButton>
        </div>
        <div className="flex space-x-2">
          <CategoryButton color="pink"></CategoryButton>
          <CategoryButton color="purple"></CategoryButton>
        </div>
        <div className="flex space-x-2">
          <CategoryButton color="red"></CategoryButton>
          <CategoryButton color="blue"></CategoryButton>
        </div>
        <div className="flex space-x-2">
          <CategoryButton color="yellow"></CategoryButton>
          <CategoryButton color="green"></CategoryButton>
        </div>
        <div className="flex space-x-2">
          <CategoryButton color="pink"></CategoryButton>
          <CategoryButton color="purple"></CategoryButton>
        </div>
      </div>
    </CommonLayout>
  )
}
