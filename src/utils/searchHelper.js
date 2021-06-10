import React from 'react';
import * as Yup from 'yup';


export const SearchSchema =Yup.object().shape({
    search:Yup.string()
    .required('Required'),
    state:Yup.string()
    .required('Required')
})


export const FormElement =(props) => {
    let template = null;

    switch(props.elData.element){
        case 'input':
            template=<div className="row">
                <div className="twelve columns">
                    <input
                        type={props.elData.type}
                        name={props.name}
                        onChange={(e)=>props.onHandleChange(e)}
                        onBlur={(e)=>props.onHandleBlur(e)}
                        value={props.elData.value}
                        placeholder={props.placeholder}
                        className="u-full-width"

                    />
                    {props.errors && props.touched ?
                    <div className="error_label">{props.errors}</div>
                :null}

                </div>

            </div>
        
        break;
        case 'select':
            template=< div className="row">
                <div className="twelve columns">
                    <select
                        name={props.name}
                        onChange={(e)=>props.onHandleChange(e)}
                        onBlur={(e)=>props.onHandleBlur(e)}
                        value={props.elData.value}
                        placeholder={props.placeholder}
                        className="u-full-width"
                    >
                    {props.children}
                    </select>
                    {props.errors && props.touched ?
                    <div className="error_label">{props.errors}</div>
                :null} 
                        
                </div>
            </div>
            

        break;
        default:
            template = null;

    }

    return template;

}