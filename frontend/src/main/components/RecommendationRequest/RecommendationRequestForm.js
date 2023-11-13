import { Button, Form, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function RecommendationRequestForm({ initialContents, submitAction, buttonLabel = "Create" }) {

    // Stryker disable next-line Regex
    const isodate_regex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/i;
    // Stryker disable next-line Regex
    const email_regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    // Stryker disable next-line Regex
    const boolean_regex = /^(true|false)$/;

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
    const testIdPrefix = "RecommendationRequestForm";

    return (
        <Form onSubmit={handleSubmit(submitAction)}>
            <Row>
                {initialContents && (
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor="id">Id</Form.Label>
                            <Form.Control
                                data-testid="RecommendationRequestForm-id"
                                id="id"
                                type="text"
                                {...register("id")}
                                value={initialContents.id}
                                disabled
                            />
                        </Form.Group>
                    </Col>
                )}
            </Row>

            <Row>
                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="requesterEmail">Requester email</Form.Label>
                        <Form.Control
                            data-testid={testIdPrefix + "-requesterEmail"}
                            id="requesterEmail"
                            type="text"
                            isInvalid={Boolean(errors.requesterEmail)}
                            {...register("requesterEmail", {
                                required: 'Requester email is required.',
                                pattern: { value: email_regex, message: 'Requester email is invalid.'}
                            })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.requesterEmail?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="professorEmail">Professor email</Form.Label>
                        <Form.Control
                            data-testid={testIdPrefix + "-professorEmail"}
                            id="professorEmail"
                            type="text"
                            isInvalid={Boolean(errors.professorEmail)}
                            {...register("professorEmail", {
                                required: 'Professor email is required.',
                                pattern: { value: email_regex, message: 'Professor email is invalid.'}
                            })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.professorEmail?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="explanation">Explanation</Form.Label>
                        <Form.Control
                            data-testid={testIdPrefix + "-explanation"}
                            id="explanation"
                            type="text"
                            isInvalid={Boolean(errors.explanation)}
                            {...register("explanation", {
                                required: "Explanation is required."
                            })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.explanation?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>                
            </Row>

            <Row>
                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="dateRequested">Date requested (iso format)</Form.Label>
                        <Form.Control
                            data-testid= {testIdPrefix + "-dateRequested"}
                            id="dateRequested"
                            type="datetime-local"
                            isInvalid={Boolean(errors.dateRequested)}
                            {...register("dateRequested", { 
                                required: 'Date requested is required.', 
                                pattern: isodate_regex 
                            })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.dateRequested?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>       
                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="dateNeeded">Date needed (iso format)</Form.Label>
                        <Form.Control
                            data-testid= {testIdPrefix + "-dateNeeded"}
                            id="dateNeeded"
                            type="datetime-local"
                            isInvalid={Boolean(errors.dateNeeded)}
                            {...register("dateNeeded", { 
                                required: 'Date needed is required.',
                                pattern: isodate_regex 
                            })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.dateNeeded?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                <Form.Group className="mb-3" >
                        <Form.Label htmlFor="done">Done</Form.Label>
                        <Form.Control
                            data-testid={testIdPrefix + "-done"}
                            id="done"
                            type="text"
                            isInvalid={Boolean(errors.professorEmail)}
                            {...register("done", {
                                required: "Done field is required.",
                                pattern: {value: boolean_regex, message: "Value must be 'true' or 'false'."}
                            })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.done?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>  
            </Row>

            <Row>
                <Col>
                    <Button
                        type="submit"
                        data-testid="RecommendationRequestForm-submit"
                    >
                        {buttonLabel}
                    </Button>
                    <Button
                        variant="Secondary"
                        onClick={() => navigate(-1)}
                        data-testid="RecommendationRequestForm-cancel"
                    >
                        Cancel
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

export default RecommendationRequestForm