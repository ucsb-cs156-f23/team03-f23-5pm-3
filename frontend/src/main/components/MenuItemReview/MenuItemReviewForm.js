import { Button, Form, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function MenuItemReviewForm({ initialContents, submitAction, buttonLabel = "Create" }) {

    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialContents || {}, }
    );
    // Stryker restore all

    const navigate = useNavigate();

    // For explanation, see: https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
    // Note that even this complex regex may still need some tweaks

    // Stryker disable next-line Regex
    const isodate_regex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/i;
    const email_regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const number_regex = /^[0-9]\d*$/;
    const stars_regex = /^[0-5]$/;
    
    


    

    //const email_regx = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@" + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";

    return (

        <Form onSubmit={handleSubmit(submitAction)}>


            <Row>

                {initialContents && (
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor="id">Id</Form.Label>
                            <Form.Control
                                data-testid="MenuItemReviewForm-id"
                                id="id"
                                type="text"
                                {...register("id")}
                                value={initialContents.id}
                                disabled
                            />
                        </Form.Group>
                    </Col>
                )}

                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="itemid">itemid </Form.Label>
                        <Form.Control
                            data-testid="MenuItemReviewForm-itemid"
                            id="itemid"
                            type="text"
                        //     isInvalid={Boolean(errors.itemId)}
                        //     {...register("itemid", {
                        //         required: 'Item ID is required.',
                        //         pattern: { value: number_regex, message: 'item id is invalid, enter a positive number.'}
                        //     })}
                        // />
                        // <Form.Control.Feedback type="invalid">
                        //     {errors.itemId?.message}
                        // </Form.Control.Feedback>
                        isInvalid={Boolean(errors.itemid)}
                            {...register("itemid", {
                                required: 'itemid is required.',
                                pattern: { value: number_regex, message: 'enter a valid item id positive integer'}
                            })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.itemid?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="reviewerEmail">ReviewerEmail</Form.Label>
                        <Form.Control
                            data-testid="MenuItemReviewForm-reviewerEmail"
                            id="reviewerEmail"
                            type="text"
                            isInvalid={Boolean(errors.reviwerEmail)}
                            {...register("reviwerEmail", {
                                required: 'reviwerEmail is required.',
                                pattern: { value: email_regex, message: 'enter a valid email'}
                            })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.reviwerEmail?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="stars">Stars</Form.Label>
                        <Form.Control
                            data-testid="MenuItemReviewForm-stars"
                            id="stars"
                            type="text"
                            isInvalid={Boolean(errors.stars)}
                            {...register("stars", {
                                required: 'stars is required.',
                                pattern: { value: stars_regex, message: 'stars invalid, enter a number between 0 and 5.'}
                            })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.stars?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="dateReviewed">DateReviewed (iso format)</Form.Label>
                        <Form.Control
                            data-testid="MenuItemReviewForm-dateReviewed"
                            id="dateReviewed"
                            type="datetime-local"
                        //     isInvalid={Boolean(errors.localDateTime)}
                        //     {...register("dateReviewed", { required: true, pattern: isodate_regex })}
                        // />
                        // <Form.Control.Feedback type="invalid">
                        //     {errors.dateReviewed && 'dateReviewed is required. '}
                        // </Form.Control.Feedback>
                        isInvalid={Boolean(errors.dateReviewed)}
                            {...register("dateReviewed", {
                                required: 'Date Reviwed is required.',
                                pattern: { value: isodate_regex, message: 'dateReviewed must be in ISO format'}
                            })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.dateReviewed?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Row>

                <Col>

                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="comments">Comments</Form.Label>
                        <Form.Control
                            data-testid="MenuItemReviewForm-comments"
                            id="comments"
                            type="text"
                            isInvalid={Boolean(errors.comments)}
                            {...register("comments", {
                                required: true
                            })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.comments && 'comments is required.'}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Button
                        type="submit"
                        data-testid="MenuItemReviewForm-submit"
                    >
                        {buttonLabel}
                    </Button>
                    <Button
                        variant="Secondary"
                        onClick={() => navigate(-1)}
                        data-testid="MenuItemReviewForm-cancel"
                    >
                        Cancel
                    </Button>
                </Col>
            </Row>
        </Form>

    )
}

export default MenuItemReviewForm;
