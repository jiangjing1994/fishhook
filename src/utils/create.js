const KEY_COMPONENT_NAME = "Kem";
export default function(sfc) {
  sfc.name = KEY_COMPONENT_NAME + sfc.name;
  sfc.mixins = sfc.mixins || [];
  return sfc;
}
