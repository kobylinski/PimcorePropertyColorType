<?php

namespace PimcorePropertyColorType;

use Pimcore\API\Plugin as PluginLib;

class Plugin extends PluginLib\AbstractPlugin implements PluginLib\PluginInterface
{
    public function init()
    {
        parent::init();
    }
    public static function install()
    {
        return self::getDb()->query(
            "ALTER TABLE properties MODIFY type ENUM(
                    'text', 'document', 'asset', 'object', 'bool', 'select', 'color'
                )"
        )->execute();
    }
    public static function uninstall()
    {
        return
            self::getDb()->query(
                'UPDATE properties SET type = "text" WHERE type = "color"'
            )->execute()
            &&
            self::getDb()->query(
            "ALTER TABLE properties MODIFY type ENUM(
                    'text', 'document', 'asset', 'object', 'bool', 'select'
                )"
            )->execute();
    }
    public static function isInstalled()
    {
        $info = self::getDb()->query('SHOW columns From properties WHERE Field = "type"')->fetch();
        return strstr($info['Type'], 'color');
    }
}

//;