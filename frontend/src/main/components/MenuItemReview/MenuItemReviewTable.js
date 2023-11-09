import React from "react";
import OurTable, { ButtonColumn } from "main/components/OurTable";

import { useBackendMutation } from "main/utils/useBackend";
import { cellToAxiosParamsDelete, onDeleteSuccess } from "main/utils/menuItemReviewUtils"
import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

export default function MenuItemReviewTable({ review, currentUser }) {

    const navigate = useNavigate();

    const editCallback = (cell) => {
        navigate(`/menuitemreview/edit/${cell.row.values.id}`)
    }

    // Stryker disable all : hard to test for query caching

    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/menuitemreview/all"]
    );
    // Stryker restore all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    // private long itemid;
    // private String reviewerEmail;
    // private int stars;
    // private LocalDateTime dateReviewed;
    // private String comments;

    const columns = [
        {
            Header: 'id',
            accessor: 'id', // accessor is the "key" in the data
        },
        {
            Header: 'Itemid',
            accessor: 'itemid',
        },
        {
            Header: 'ReviewerEmail',
            accessor: 'reviewerEmail',
        },
        {
            Header: 'Stars',
            accessor: 'stars',
        },
        {
            Header: 'DateReviewed',
            accessor: 'dateReviewed',
        },
        {
            Header: 'Comments',
            accessor: 'comments',
        }
    ];

    if (hasRole(currentUser, "ROLE_ADMIN")) {
        columns.push(ButtonColumn("Edit", "primary", editCallback, "MenuItemReviewTable"));
        columns.push(ButtonColumn("Delete", "danger", deleteCallback, "MenuItemReviewTable"));
    } 

    return <OurTable
        data={review}
        columns={columns}
        testid={"MenuItemReviewTable"}
    />;
};