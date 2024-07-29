"use client"
import { Offer, Project } from '@/components/types/DemoTypes'
import React from 'react'
import OffersTable from '../../_components/OffersTable';

interface Props {
    offers: Offer[];
    project: Project;
}

const AllOffersPageContent = ({ offers, project }: Props) => {
  return (
    <div>
      <h1 className="text-xl font-medium pb-5">All Offers</h1>
      <OffersTable data={offers} projectId={project.id} />
    </div>
  )
}

export default AllOffersPageContent