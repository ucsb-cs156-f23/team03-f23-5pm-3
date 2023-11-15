import MenuItemReviewForm from "main/components/MenuItemReview/MenuItemReviewForm";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { Navigate } from 'react-router-dom'
import { useBackend,useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function MenuitemReviewEditPage({storybook=false}) {
  let { id } = useParams();

  const { data: menuItemReview, _error, _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      [`/api/menuitemreview?id=${id}`],
      {  // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
        method: "GET",
        url: `/api/menuitemreview`,
        params: {
          id
        }
      }
    );
    // private long id;

    // private long itemid;
    // private String reviewerEmail;
    // private int stars;
    // private LocalDateTime dateReviewed;
    // private String comments;

  const objectToAxiosPutParams = (menuItemReview) => ({
    url: "/api/menuitemreview",
    method: "PUT",
    params: {
      id: menuItemReview.id,
    },
    data: {
      id: menuItemReview.id,
      itemid: menuItemReview.itemid,
      reviewerEmail: menuItemReview.reviewerEmail,
      stars: menuItemReview.stars,
      dateReviewed: menuItemReview.dateReviewed,
      comments: menuItemReview.comments
    }
  });

  const onSuccess = (menuItemReview) => {
    toast(`MenuItemReview Updated - id: ${menuItemReview.id} itemid: ${menuItemReview.itemid}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosPutParams,
    { onSuccess },
    // Stryker disable next-line all : hard to set up test for caching
    [`/api/menuitemreview?id=${id}`]
  );

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data);
  }

  if (isSuccess && !storybook) {
    return <Navigate to="/menuitemreview" />
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Edit MenuItemReview</h1>
        {
          menuItemReview && <MenuItemReviewForm initialContents={menuItemReview} submitAction={onSubmit} buttonLabel="Update" />
        }
      </div>
    </BasicLayout>
  )
}

