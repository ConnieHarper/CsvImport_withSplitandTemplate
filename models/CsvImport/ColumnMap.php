<?php
/**
 * CsvImport_ColumnMap class
 *
 * @copyright  Center for History and New Media, 2008
 * @license    http://www.gnu.org/licenses/gpl-3.0.txt
 * @version    $Id:$
 **/

/**
 * CsvImport_ColumnMap - represents a mapping 
 * from a column in a csv file to an item element, file, or tag
 * 
 * @package CsvImport
 * @author CHNM
 **/
class CsvImport_ColumnMap 
{
    const TARGET_TYPE_ELEMENT = 'Element';
    const TARGET_TYPE_TAG = 'Tag';
    const TARGET_TYPE_FILE = 'File';
   
    protected $_columnIndex;
    protected $_targetType;
    protected $_elementIds;
   
   	/**
   * @param string $columnIndex	the id of the column, starting at 0 from left to right in the csv file
   * @param string $targetType	the type of target that the column maps to, including: 'Element', 'Tag', or 'File'
   * @param array $elementIds  the element ids to which a column maps
   * @param boolean $dataIsHtml whether the column data is HTML
   **/
    public function __construct( $columnIndex, $targetType, $elementIds=array(), $dataIsHtml=false, $dataIsSplit=false) 
	{
		$this->_columnIndex = $columnIndex;
		$this->_targetType = $targetType;
		$this->_elementIds = $elementIds;
		$this->_dataIsHtml = $dataIsHtml;
		$this->_dataIsSplit = $dataIsSplit;
	}
	
	/**
    * Get the column index of the mapping
    * 
    * @return integer
    **/
 	public function getColumnIndex()
 	{
         return $this->_columnIndex;
 	}
	
	
	/**
    * Returns whether the column maps to one or more split.
    * Assumes that the column cell has comma seperated split.
    * 
    * @return boolean
    **/
 	public function mapsToSplit()
 	{
         return $this->_targetType == self::TARGET_TYPE_SPLIT;
 	}
 	
	/**
    * Returns whether the column maps to one or more tags.
    * Assumes that the column cell has comma seperated tags.
    * 
    * @return boolean
    **/
 	public function mapsToTag()
 	{
         return $this->_targetType == self::TARGET_TYPE_TAG;
 	}
 	
 	/**
    * Returns whether the column maps to one or more elements.
    * Assumes that the column cell has text which be used as element text for one or more elements.
    * 
    * @return boolean
    **/
 	public function mapsToElement()
 	{
         return $this->_targetType == self::TARGET_TYPE_ELEMENT;
 	}
 	
 	/**
    * Returns whether the column maps to a file
    * Assumes that the column cell has a Url to a file to download and attach to the item.
    * 
    * @return boolean
    **/
 	public function mapsToFile()
 	{
         return $this->_targetType == self::TARGET_TYPE_FILE;
 	}
 	
 	/**
 	* Returns whether the column data is HTML. 
 	* 
 	* @return boolean
 	**/
 	public function getDataIsHtml()
 	{
 	    return $this->_dataIsHtml;
 	}
 	
 	/**
 	* Sets whether the column data is HTML. 
 	* 
 	* @param boolean Whether the column data contains HTML
 	* @return void
 	**/
 	public function setDataIsHtml($dataIsHtml)
 	{
 	    $this->_dataIsHtml = $dataIsHtml;
 	}
 	/**
 	* Sets whether the column data is Split. 
 	* 
 	* @param boolean Whether the column data contains Split
 	* @return void
 	**/
 	public function setDataIsSplit($dataIsSplit)
 	{
 	    $this->_dataIsSplit = $dataIsSplit;
 	}
 	/**
 	* Returns whether the column data is Split. 
 	* 
 	* @return boolean
 	**/
 	public function getDataIsSplit()
 	{
 	    return $this->_dataIsSplit;
 	}
 	
 	 	
 	/**
    * Get the element ids to which the column maps.
    * Only useful if the column maps to an element.
    * 
    * @return array
    **/
 	public function getElementIds()
 	{
         return $this->_elementIds;
 	}
 	
 	/**
    * Adds an element id to the column mapping.
    * Only useful if the column maps to an element.
    * 
    * @return void
    **/
 	public function addElementId($elementId)
 	{
         if (!in_array($elementId, $this->_elementIds)) {
             $this->_elementIds[] = $elementId;
         } 
 	}
}
