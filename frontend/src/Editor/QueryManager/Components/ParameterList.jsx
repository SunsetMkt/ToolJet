import React, { useEffect, useRef, useState } from 'react';
import ParameterDetails, { PillButton } from './ParameterDetails';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import ParameterForm from './ParameterForm';

const ParameterList = ({
  parameters = [],
  handleAddParameter,
  handleParameterChange,
  handleParameterRemove,
  darkMode,
  containerRef,
}) => {
  const [showMore, setShowMore] = useState(false);
  const [selectedParameter, setSelectedParameter] = useState();
  const [formattedParameters, setFormattedParameters] = useState([]);
  const containerWidth = containerRef.current?.offsetWidth;

  useEffect(() => {
    let totalWidth = 0;
    const formattedParams = containerWidth
      ? parameters.map((param, index) => {
          const boxWidth = Math.min((param?.name || '').length * 6 + 63 + 8, 178);
          totalWidth = Math.min(totalWidth + boxWidth, containerWidth);
          return {
            ...param,
            isVisible: totalWidth < containerWidth - 178,
            index,
          };
        })
      : [];
    setFormattedParameters(formattedParams);
    if (formattedParams.every((param) => param.isVisible)) {
      setShowMore(false);
    }
  }, [JSON.stringify(parameters), containerWidth]);

  const handleClickOutside = (event) => {
    if (showMore && event.target.closest('#parameter-more-popover') === null) {
      setShowMore(false);
    }
  };

  useEffect(() => {
    if (showMore) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMore]);

  return (
    <div className="card-header">
      <p style={{ marginRight: '4px', margin: '0px' }}>Parameters</p>
      {formattedParameters
        .filter((param) => param.isVisible)
        .map((parameter) => {
          return (
            <ParameterDetails
              isEdit
              key={parameter.name}
              onSubmit={(param) => handleParameterChange(parameter.index, param)}
              onRemove={() => handleParameterRemove(parameter.index)}
              name={parameter.name}
              otherParams={formattedParameters.filter((p) => p.name !== parameter.name)}
              defaultValue={parameter.defaultValue}
              // currentState={currentState}
              darkMode={darkMode}
            />
          );
        })}
      <OverlayTrigger
        trigger={'click'}
        placement={'bottom-end'}
        rootClose={true}
        show={showMore}
        overlay={
          <Popover
            id="parameter-more-popover"
            className={`query-manager-sort-filter-popup  ${darkMode && 'popover-dark-themed theme-dark dark-theme'}`}
            style={{ minWidth: '270px', maxWidth: 'fit-content' }}
          >
            {selectedParameter ? (
              <ParameterForm
                darkMode={darkMode}
                isEdit={true}
                name={selectedParameter.name}
                defaultValue={selectedParameter.defaultValue}
                onSubmit={(param) => {
                  if (!param?.name) {
                    return;
                  }
                  handleParameterChange(selectedParameter.index, param);
                  setSelectedParameter();
                }}
                showModal={showMore}
              />
            ) : (
              <Popover.Body
                key={'1'}
                bsPrefix="popover-body"
                className={`ps-1 pe-1  py-2 query-manager`}
                style={{ maxWidth: '500px' }}
              >
                {formattedParameters
                  .filter((param) => !param.isVisible)
                  .map((parameter) => {
                    return (
                      <span key={parameter.name}>
                        <PillButton
                          name={parameter.name}
                          onRemove={() => handleParameterRemove(parameter.index)}
                          marginBottom
                          onClick={() => setSelectedParameter(parameter)}
                        />
                      </span>
                    );
                  })}
              </Popover.Body>
            )}
          </Popover>
        }
      >
        <span>
          {formattedParameters.some((param) => !param.isVisible) && (
            <PillButton
              name={`+${formattedParameters.reduce((count, param) => count + (!param.isVisible ? 1 : 0), 0)}`}
              onClick={() => setShowMore(true)}
              className="more-parameters-button"
            />
          )}
        </span>
      </OverlayTrigger>
      <ParameterDetails onSubmit={handleAddParameter} darkMode={darkMode} otherParams={formattedParameters} />
    </div>
  );
};

export default ParameterList;
