Ext.namespace('Ext.theme.is')['my-theme'] = true;
Ext.theme.name = 'my-theme';

Ext.theme.getDocCls = function() {
    return Ext.platformTags.phone ? 'x-big' : '';
};