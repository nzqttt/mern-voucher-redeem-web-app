import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Editor } from 'primereact/editor';
import { Checkbox } from 'primereact/checkbox';


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const VouchersCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            id: _entity?.id,
categoryId: _entity?.categoryId,
points: _entity?.points,
title: _entity?.title,
image: _entity?.image,
description: _entity?.description,
termsCondition: _entity?.termsCondition,
isLatest: _entity?.isLatest,
        };

        setLoading(true);
        try {
            
        const result = await client.service("vouchers").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info vouchers updated successfully" });
        props.onEditResult(result);
        
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    

    return (
        <Dialog header="Edit Vouchers" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="vouchers-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="id">Id:</label>
                <InputText id="id" className="w-full mb-3 p-inputtext-sm" value={_entity?.id} onChange={(e) => setValByKey("id", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["id"]) && (
              <p className="m-0" key="error-id">
                {error["id"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="categoryId">CategoryId:</label>
                <InputText id="categoryId" className="w-full mb-3 p-inputtext-sm" value={_entity?.categoryId} onChange={(e) => setValByKey("categoryId", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["categoryId"]) && (
              <p className="m-0" key="error-categoryId">
                {error["categoryId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="points">Points:</label>
                <InputNumber id="points" className="w-full mb-3 p-inputtext-sm" value={_entity?.points} onChange={(e) => setValByKey("points", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["points"]) && (
              <p className="m-0" key="error-points">
                {error["points"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="title">Title:</label>
                <InputText id="title" className="w-full mb-3 p-inputtext-sm" value={_entity?.title} onChange={(e) => setValByKey("title", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["title"]) && (
              <p className="m-0" key="error-title">
                {error["title"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="image">Image:</label>
                <InputText className="w-full mb-3 p-inputtext-sm" value={_entity?.image} onChange={(e) => setValByKey("image", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["image"]) && (
              <p className="m-0" key="error-image">
                {error["image"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="description">Description:</label>
                <InputTextarea id="description" rows={5} cols={30} value={_entity?.description} onChange={ (e) => setValByKey("description", e.target.value)} autoResize  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["description"]) && (
              <p className="m-0" key="error-description">
                {error["description"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 field">
                <span className="align-items-center">
                    <label htmlFor="termsCondition">Terms and Condition:</label>
                    <Editor id="termsCondition" value={_entity?.termsCondition} onTextChange={(e) => setValByKey("termsCondition", e.htmlValue)} style={{ height: '320px' }} />
                </span>
                <small className="p-error">
                {!_.isEmpty(error["termsCondition"]) && (
                  <p className="m-0" key="error-termsCondition">
                    {error["termsCondition"]}
                  </p>
                ) }
              </small>
                </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="isLatest">IsLatest:</label>
                <Checkbox id="isLatest" className="ml-3" checked={_entity?.isLatest} onChange={(e) => setValByKey("isLatest", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["isLatest"]) && (
              <p className="m-0" key="error-isLatest">
                {error["isLatest"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
                <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(VouchersCreateDialogComponent);
