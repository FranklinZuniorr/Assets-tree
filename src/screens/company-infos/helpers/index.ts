import { ENUM_ELEMENT_TYPE } from '../constants';
import { AssetInternal, LocationInternal } from '../interfaces';

export const getFilteredChildren = (
  element: LocationInternal | AssetInternal, 
  allElements: (LocationInternal | AssetInternal)[]
): (LocationInternal | AssetInternal)[] => {
  return allElements.filter(child => {
    switch (element.elementType) {
      case ENUM_ELEMENT_TYPE.LocationRoot:
        return (
          (child.elementType === ENUM_ELEMENT_TYPE.SubLocation && child.parentId === element.id) ||
          (child.elementType === ENUM_ELEMENT_TYPE.AssetRoot && (child as AssetInternal).locationId === element.id)
        );

      case ENUM_ELEMENT_TYPE.SubLocation:
        return (
          child.elementType === ENUM_ELEMENT_TYPE.AssetRoot &&
          (child as AssetInternal).locationId === element.id
        );

      case ENUM_ELEMENT_TYPE.AssetRoot:
        return (
          (child.elementType === ENUM_ELEMENT_TYPE.SubAsset && child.parentId === element.id) ||
          (child.elementType === ENUM_ELEMENT_TYPE.ComponentLinkedToAsset && child.parentId === element.id)
        );

      case ENUM_ELEMENT_TYPE.SubAsset:
        return (
          child.elementType === ENUM_ELEMENT_TYPE.ComponentLinkedToAsset &&
          child.parentId === element.id
        );

      case ENUM_ELEMENT_TYPE.ComponentUnlinked:
      case ENUM_ELEMENT_TYPE.ComponentLinkedToAsset:
      case ENUM_ELEMENT_TYPE.ComponentLinkedToLocation:
        return false;

      default:
        throw new Error('Tipo de elemento não identificado');
    }
  });
};

export const getFilteredChildrenStart = (allElements: (LocationInternal | AssetInternal)[]): (LocationInternal | AssetInternal)[] => {
const filter = allElements.filter(element => 
  element.elementType === ENUM_ELEMENT_TYPE.LocationRoot || 
  element.elementType === ENUM_ELEMENT_TYPE.ComponentUnlinked);

  return filter;
}

